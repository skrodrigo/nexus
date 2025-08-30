'use server';

import { prisma } from "@/lib/prisma";

export async function getUserChats(userId: string) {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
    return { success: true, data: chats };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user chats.' };
  }
}
