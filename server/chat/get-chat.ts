'use server';

import { prisma } from "@/lib/prisma";

export async function getChat(id: string, userId: string) {
  try {
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
      return { success: false, error: 'Chat not found' };
    }

    return { success: true, data: chat };
  } catch (error) {
    return { success: false, error: 'Failed to fetch chat.' };
  }
}