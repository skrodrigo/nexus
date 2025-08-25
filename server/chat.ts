'use server';

import { prisma } from '@/lib/prisma';

import { convertToModelMessages, streamText } from 'ai';

import { nanoid } from 'nanoid';

import { revalidatePath } from 'next/cache';

import { checkSubscriptionAndUsage, incrementUserUsage } from './usage';
import { getUserSession } from './user';

import { openrouter } from '@/lib/openrouter';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

function getModelProvider(modelValue: string) {
  switch (modelValue) {
    case 'gemini/gemini-2.5-flash':
      return google('gemini-2.5-flash');
    case 'openai/gpt-5-nano':
      return openai('gpt-5-nano');
    case 'openai/gpt-4.1-nano':
      return openai('gpt-4.1-nano');
    case 'deepseek/deepseek-v3':
      return openrouter('deepseek/deepseek-chat-v3-0324:free');
    default:
      return google('gemini-1.5-pro');
  }
}

export async function startOrContinueChat(
  chatId: string | null,
  userMessage: string,
) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return { error: 'Unauthorized' };
  }
  const userId = session.data.user.id;

  let finalChatId = chatId;

  if (finalChatId) {
    const chat = await prisma.chat.findFirst({
      where: { id: finalChatId, userId },
    });
    if (!chat) {
      finalChatId = null;
    }
  }

  if (!finalChatId) {
    const newChat = await prisma.chat.create({
      data: {
        id: nanoid(),
        userId: userId,
        title: userMessage.substring(0, 50),
      },
    });
    finalChatId = newChat.id;
    revalidatePath('/');
  }

  await prisma.message.create({
    data: {
      chatId: finalChatId,
      role: 'user',
      content: userMessage,
    },
  });

  await incrementUserUsage(userId);

  revalidatePath(`/chat/${finalChatId}`);

  return { chatId: finalChatId };
}

export async function createChat() {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return { error: 'Unauthorized' };
  }
  const userId = session.data.user.id;

  const newChat = await prisma.chat.create({
    data: {
      id: nanoid(),
      userId: userId,
      title: 'Novo Chat',
    },
  });

  return { chatId: newChat.id };
}

export async function saveAssistantMessage(
  chatId: string,
  assistantMessage: string,
) {
  await prisma.message.create({
    data: {
      chatId: chatId,
      role: 'assistant',
      content: assistantMessage,
    },
  });
  revalidatePath(`/chat/${chatId}`);
}

export async function getUserChats(userId: string) {
  return prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getChat(id: string, userId: string) {
  const chat = await prisma.chat.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!chat) {
    return null;
  }

  return chat;
}

export async function shareChat(id: string) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id,
      userId: session.data.user.id,
    },
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  const sharePath = chat.sharePath ?? nanoid(8);

  const updatedChat = await prisma.chat.update({
    where: { id },
    data: {
      isPublic: true,
      sharePath: sharePath,
    },
  });

  revalidatePath(`/chat/${id}`);
  return updatedChat;
}

export async function getPublicChat(sharePath: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      sharePath,
      isPublic: true,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return chat;
}

export async function deleteChat(id: string) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id,
      userId: session.data.user.id,
    },
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  await prisma.chat.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath(`/chat/${id}`);
}

export async function handleChatRequest(req: Request) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  const userId = session.data.user.id;

  const body = await req.json();
  const messages = Array.isArray(body?.messages) ? body.messages : body?.messages ?? [];
  const data = body?.data ?? body ?? {};
  const model: string | undefined = data?.model;
  const chatIdFromClient: string | undefined = data?.chatId;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Invalid request: messages array is required', { status: 400 });
  }

  const { limitReached } = await checkSubscriptionAndUsage(userId);
  if (limitReached) {
    return new Response(JSON.stringify({ error: 'Message limit reached' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastMessage = messages[messages.length - 1];
  const messageContent =
    Array.isArray(lastMessage.parts)
      ? lastMessage.parts.find((p: any) => p.type === 'text')?.text || ''
      : lastMessage.content || '';

  const chatResult = await startOrContinueChat(
    chatIdFromClient || null,
    messageContent,
  );
  if (chatResult?.error) {
    return new Response(chatResult.error, { status: 403 });
  }

  if (!chatResult?.chatId) {
    return new Response('Failed to create or continue chat', { status: 500 });
  }

  const chatId = chatResult.chatId;

  const fullChat = await getChat(chatId, userId);
  if (!fullChat) {
    return new Response('Chat not found after creation', { status: 500 });
  }

  const history = fullChat.messages
    .filter(m => typeof m.content === 'string')
    .map(m => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: m.content as string }],
    }));

  const selectedModel = getModelProvider(model || 'gemini/gemini-2.5-flash');

  try {
    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(history),
      system:
        'You are a helpful assistant that can answer questions and help with tasks',
      onFinish: async ({ text }) => {
        await saveAssistantMessage(chatId!, text);
      },
    });

    return result.toTextStreamResponse({
      headers: {
        'X-Chat-Id': chatId!,
        'Set-Cookie': `chatId=${chatId!}; Path=/; Max-Age=600; SameSite=Lax`,
      },
    });
  } catch (error: any) {
    console.error('AI API Error:', error);

    if (model && model !== 'gemini/gemini-2.5-flash') {
      try {
        const fallbackModel = google('gemini-2.5-flash');
        const result = streamText({
          model: fallbackModel,
          messages: convertToModelMessages(history),
          system:
            'You are a helpful assistant that can answer questions and help with tasks',
          onFinish: async ({ text }) => {
            await saveAssistantMessage(chatId!, text);
          },
        });

        return result.toTextStreamResponse({
          headers: {
            'X-Chat-Id': chatId!,
            'Set-Cookie': `chatId=${chatId!}; Path=/; Max-Age=600; SameSite=Lax`,
          },
        });
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
      }
    }

    return new Response(
      JSON.stringify({
        error: 'AI service temporarily unavailable. Please try again in a few minutes.',
        details: error.message
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
