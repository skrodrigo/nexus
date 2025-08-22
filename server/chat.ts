'use server';

import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUserSession } from './user';

export async function startOrContinueChat(
  chatId: string | null,
  userMessage: string,
) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }
  const userId = session.data.user.id;

  if (chatId) {
    await prisma.message.create({
      data: {
        chatId: chatId,
        role: 'user',
        content: userMessage,
      },
    });
    revalidatePath(`/chat/${chatId}`);
    return chatId;
  } else {
    const newChat = await prisma.chat.create({
      data: {
        id: nanoid(),
        userId: userId,
        title: userMessage.substring(0, 50),
        messages: {
          create: {
            role: 'user',
            content: userMessage,
          },
        },
      },
    });
    revalidatePath('/');
    return newChat.id;
  }
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
  const chat = await prisma.chat.findUnique({
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