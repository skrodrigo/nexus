'use server';

import { convertToModelMessages, streamText } from 'ai';
import { getChat, saveAssistantMessage, startOrContinueChat } from './chat';
import { checkSubscriptionAndUsage, incrementUserUsage } from './usage';
import { getUserSession } from './user';

import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

function getModelProvider(modelValue: string) {
  switch (modelValue) {
    case 'gemini/gemini-2.5-flash':
      return google('gemini-2.5-flash');
    case 'gemini/gemini-2.5-pro':
      return google('gemini-2.5-pro');
    case 'openai/gpt-5-mini':
      return openai('gpt-5-mini');
    case 'openai/gpt-4.1':
      return openai('gpt-4.1');
    case 'deepseek/deepseek-r1':
      return openrouter('deepseek/deepseek-r1-0528:free');
    case 'deepseek/deepseek-v3':
      return openrouter('deepseek/deepseek-chat-v3-0324:free');
    default:
      return google('gemini-1.5-pro');
  }
}

export async function handleChatRequest(req: Request) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  const userId = session.data.user.id;

  const body = await req.json();
  const messages = Array.isArray(body?.messages) ? body.messages : body?.messages ?? [];
  // Support both nested `data` and root-level fields
  const data = body?.data ?? body ?? {};
  const model: string | undefined = data?.model;
  const chatIdFromClient: string | undefined = data?.chatId;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Invalid request: messages array is required', { status: 400 });
  }

  const { limitReached } = await checkSubscriptionAndUsage(userId);
  if (limitReached) {
    return new Response('Message limit reached', { status: 403 });
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

  const selectedModel = getModelProvider(model || 'gemini-1.5-pro');

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
      // Expose chatId via cookie so client can read it after streaming finishes
      'Set-Cookie': `chatId=${chatId!}; Path=/; Max-Age=600; SameSite=Lax`,
    },
  });
}
