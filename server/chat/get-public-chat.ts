'use server';

import { prisma } from "@/lib/prisma";


export async function getPublicChat(sharePath: string) {
  try {
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

    if (!chat) {
      return { success: false, error: 'Public chat not found' };
    }

    return { success: true, data: chat };
  } catch (error) {
    console.error('Error fetching public chat:', error);
    return { success: false, error: 'Failed to fetch public chat.' };
  }
}