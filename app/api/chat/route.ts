import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';
import { saveAssistantMessage } from '@/server/chat';

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
    const { messages, model, chatId }: { messages: UIMessage[]; model?: string; chatId?: string } = await req.json();

    if (!chatId) {
      return new Response('Bad Request: chatId is required', { status: 400 });
    }

    const safeMessages = normalize((messages || []).filter(m => m.role === 'user' || m.role === 'assistant'));
    if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1].role !== 'user') {
      return new Response('Bad Request: last message must be from user after normalization', { status: 400 });
    }

    const result = streamText({
      // model: model || 'perplexity/sonar',
      model: 'perplexity/sonar',
      messages: convertToModelMessages(safeMessages),
      system: 'You are a helpful assistant that can answer questions and help with tasks',
      onFinish: async ({ text }) => {
        await saveAssistantMessage(chatId!, text);
      },
    });

    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
