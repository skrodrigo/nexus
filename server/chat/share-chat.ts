'use server';

import { getUserSession } from "@/server/user/get-session";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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