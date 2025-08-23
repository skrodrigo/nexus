import { getChat } from '@/server/chat';
import { getUserSession } from '@/server/user';
import { notFound, redirect } from 'next/navigation';
import { UIMessage } from '@ai-sdk/react';
import { Chat } from './chat';

function normalizeMessages(messages: UIMessage[]): UIMessage[] {
  const result: UIMessage[] = [];
  for (const msg of messages) {
    if (result.length === 0) {
      result.push(msg);
      continue;
    }
    const last = result[result.length - 1];
    if (last.role === msg.role) {
      last.parts.push(...msg.parts);
    } else {
      result.push(msg);
    }
  }
  return result;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    redirect('/sign-in');
  }

  const chat = await getChat(id, session.data.user.id);

  if (!chat) {
    notFound();
  }

  const initialMessages: UIMessage[] = normalizeMessages(
    chat.messages
      .filter(m => typeof m.content === 'string')
      .map(m => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        parts: [{ type: 'text' as const, text: m.content as string }],
      }))
  );

  return <Chat chatId={id} initialMessages={initialMessages} />;
}
