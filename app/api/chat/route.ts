'use server'

import { saveAssistantMessage, startOrContinueChat } from '@/server/chat';
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

function normalize(messages: UIMessage[]): UIMessage[] {
  const result: UIMessage[] = [];
  for (const msg of messages) {
    if (result.length === 0) {
      result.push(msg);
      continue;
    }
    const last = result[result.length - 1];
    if (last.role === msg.role) {
      if (last.parts && msg.parts) last.parts.push(...msg.parts);
    } else {
      result.push(msg);
    }
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const session = await getUserSession();
    if (!session.success || !session.data?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }
    const userId = session.data.user.id;

    let { messages, model, chatId }: { messages: UIMessage[]; model?: string; chatId?: string } = await req.json();

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

    if (chatId) {
      await incrementUserUsage(userId);
    } else {
      const lastMessage = messages[messages.length - 1];
      const messageContent = lastMessage.parts.find(p => p.type === 'text')?.text || '';
      const result = await startOrContinueChat(null, messageContent);
      if (result?.error) {
        return new Response(result.error, { status: 403 });
      }
      if (result?.chatId) {
        chatId = result.chatId;
      } else {
        return new Response('Failed to create chat', { status: 500 });
      }
    }

    const safeMessages = normalize((messages || []).filter(m => m.role === 'user' || m.role === 'assistant'));
    if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1].role !== 'user') {
      return new Response('Bad Request: last message must be from user after normalization', { status: 400 });
    }

    const selectedModel = getModelProvider(model || 'gemini/gemini-2.5-flash');

    console.log('Selected model:', model, 'Provider:', selectedModel);
    console.log('Messages:', safeMessages);

    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(safeMessages),
      system: 'You are a helpful assistant that can answer questions and help with tasks',
      onFinish: async ({ text }) => {
        console.log('Response finished:', text);
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
