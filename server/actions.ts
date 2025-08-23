'use server';

import { getUserChats } from './chat';
import { getUserSession } from './user';

export async function getChatsAction() {
  const session = await getUserSession();
  
  if (!session.success || !session.data?.user?.id) {
    return { chats: [] };
  }

  const userId = session.data.user.id;
  const chats = await getUserChats(userId);

  return { chats };
}
