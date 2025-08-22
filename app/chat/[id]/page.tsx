import { getChat } from '@/server/chat';
import { getUserSession } from '@/server/user';
import { notFound, redirect } from 'next/navigation';
import { UIMessage } from '@ai-sdk/react';
import { Chat } from './chat';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    redirect('/sign-in');
  }

  const chat = await getChat(params.id, session.data.user.id);

  if (!chat) {
    notFound();
  }

  const initialMessages: UIMessage[] = chat.messages
    .filter(m => typeof m.content === 'string')
    .map(m => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      parts: [{ type: 'text', text: m.content as string }],
    }));

  return <Chat chatId={params.id} initialMessages={initialMessages} />;
}
