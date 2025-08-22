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

export async function shareChat(id: string) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id,
      userId: session.data.user.id,
    },
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  const sharePath = chat.sharePath ?? nanoid(8);

  const updatedChat = await prisma.chat.update({
    where: { id },
    data: {
      isPublic: true,
      sharePath: sharePath,
    },
  });

  revalidatePath(`/chat/${id}`);
  return updatedChat;
}

export async function getPublicChat(sharePath: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      sharePath,
      isPublic: true,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return chat;
}

export async function deleteChat(id: string) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id,
      userId: session.data.user.id,
    },
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  await prisma.chat.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath(`/chat/${id}`);
}