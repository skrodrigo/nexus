import { getChat } from '@/server/chat';
import { getUserSession } from '@/server/user';
import { notFound, redirect } from 'next/navigation';
import { UIMessage } from '@ai-sdk/react';
import { Chat } from './chat';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    redirect('/sign-in');
  }

  const chat = await getChat(id, session.data.user.id);

  const initialMessages: UIMessage[] = chat
    ? chat.messages
        .filter(m => typeof m.content === 'string')
        .map(m => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          parts: [{ type: 'text' as const, text: m.content as string }],
        }))
    : [];

  return <Chat key={id} chatId={id} initialMessages={initialMessages} />;
}
