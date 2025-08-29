'use server';

import { prisma } from "@/lib/prisma";


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