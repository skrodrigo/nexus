'use server'

import { PrismaClient, Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function getUserChats(userId: string) {
  return prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function createChat(userId: string, title: string) {
  const chat = await prisma.chat.create({
    data: { userId, title },
  });
  revalidatePath("/");
  return chat;
}

export async function addMessage(
  chatId: string,
  role: "user" | "assistant",
  content: Prisma.InputJsonValue,
) {
  const message = await prisma.message.create({
    data: {
      chatId,
      role,
      content,
    },
  });
  await prisma.chat.update({
    where: { id: chatId },
    data: { updatedAt: new Date() },
  });
  revalidatePath("/");
  return message;
}