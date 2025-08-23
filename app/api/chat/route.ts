import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';
import { saveAssistantMessage, startOrContinueChat } from '@/server/chat';
import { getUserSession } from '@/server/user';
import { checkSubscriptionAndUsage, incrementUserUsage } from '@/server/usage';

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

    const result = streamText({
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
