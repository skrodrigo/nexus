'use server'

import { getChat, saveAssistantMessage, startOrContinueChat } from '@/server/chat';
import { checkSubscriptionAndUsage, incrementUserUsage } from '@/server/usage';
import { getUserSession } from '@/server/user';

import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { NextResponse } from 'next/server';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});


export async function POST(req: Request) {
  try {
    const session = await getUserSession();
    if (!session.success || !session.data?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }
    const userId = session.data.user.id;

    const { messages, data } = await req.json();
    const { model, webSearch, chatId: chatIdFromClient } = data;

    function getModelProvider(modelValue: string) {
      switch (modelValue) {

        case 'gemini/gemini-2.5-pro':
          return google('gemini-2.5-pro');
        case 'gemini/gemini-2.5-flash':
          return google('gemini-2.5-flash');

        case 'openai/gpt-5-mini':
          return openai('gpt-5-mini');
        case 'openai/gpt-4.1':
          return openai('gpt-4o-mini');

        case 'deepseek/deepseek-r1':
          return openrouter('deepseek/deepseek-r1-0528:free');
        case 'deepseek/deepseek-v3':
          return openrouter('deepseek/deepseek-chat-v3-0324:free');

        default:
          return google('gemini-2.5-flash');
      }
    }

    const { limitReached } = await checkSubscriptionAndUsage(userId);

    if (limitReached) {
      return new Response('Message limit reached', { status: 403 });
    }

    const lastMessage = messages[messages.length - 1];
    // The last message can come in two formats: with a `parts` array (from our manual fetch)
    // or with a `content` string (from the useChat hook). We need to handle both.
    const messageContent = Array.isArray(lastMessage.parts)
      ? lastMessage.parts.find((p: any) => p.type === 'text')?.text || ''
      : lastMessage.content || '';

    const chatResult = await startOrContinueChat(chatIdFromClient || null, messageContent);
    if (chatResult?.error) {
      return new Response(chatResult.error, { status: 403 });
    }

    if (!chatResult?.chatId) {
      return new Response('Failed to create or continue chat', { status: 500 });
    }

    const chatId = chatResult.chatId;

    if (chatResult.isNewChat) {
      await incrementUserUsage(userId);
    }

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

    console.log('Selected model:', model, 'Provider:', selectedModel);
    console.log('Messages:', history);

    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(history),
      system: 'You are a helpful assistant that can answer questions and help with tasks',
      onFinish: async ({ text }) => {
        await saveAssistantMessage(chatId!, text);
      },
    });

    return result.toTextStreamResponse({
      headers: {
        'X-Chat-Id': chatId!,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
