'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveAssistantMessage(
  chatId: string,
  assistantMessage: string,
) {
  try {
    await prisma.message.create({
      data: {
        chatId: chatId,
        role: 'assistant',
        content: assistantMessage,
      },
    });
    revalidatePath(`/chat/${chatId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to save assistant message.' };
  }
}