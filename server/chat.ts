'use server';

import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUserSession } from './user';
import { incrementUserUsage } from './usage';

export async function startOrContinueChat(
  chatId: string | null,
  userMessage: string,
) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return { error: 'Unauthorized' };
  }
  const userId = session.data.user.id;

  let finalChatId = chatId;

  if (finalChatId) {
    // Use findFirst because (id, userId) is not a unique composite in the schema
    const chat = await prisma.chat.findFirst({
      where: { id: finalChatId, userId },
    });
    if (!chat) {
      finalChatId = null;
    }
  }

  if (!finalChatId) {
    const newChat = await prisma.chat.create({
      data: {
        id: nanoid(),
        userId: userId,
        title: userMessage.substring(0, 50),
      },
    });
    finalChatId = newChat.id;
    revalidatePath('/');
  }

  await prisma.message.create({
    data: {
      chatId: finalChatId,
      role: 'user',
      content: userMessage,
    },
  });

  await incrementUserUsage(userId);

  revalidatePath(`/chat/${finalChatId}`);

  return { chatId: finalChatId };
}

export async function createChat() {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return { error: 'Unauthorized' };
  }
  const userId = session.data.user.id;

  const newChat = await prisma.chat.create({
    data: {
      id: nanoid(),
      userId: userId,
      title: 'Novo Chat',
    },
  });

  return { chatId: newChat.id };
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
  // Use findFirst to constrain by both id and userId
  const chat = await prisma.chat.findFirst({
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

  const chat = await prisma.chat.findFirst({
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

  const chat = await prisma.chat.findFirst({
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