'use server';

import { getUserSession } from "@/server/user/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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