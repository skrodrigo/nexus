'use server';

import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { saveAssistantMessage } from "./save-assistant-message";
import { getModelProvider } from "./get-model-provider";
import { getChat } from "./get-chat";
import { getUserSession } from "../user/get-session";
import { getUserUsage } from "../user/get-usage";
import { startOrContinueChat } from "./start-or-continue-chat";

export async function handleChatRequest(req: Request) {
  const session = await getUserSession();
  if (!session.success || !session.data?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  const userId = session.data.user.id;

  const body = await req.json();
  const messages = Array.isArray(body?.messages) ? body.messages : body?.messages ?? [];
  const data = body?.data ?? body ?? {};
  const model: string | undefined = data?.model;
  const chatIdFromClient: string | undefined = data?.chatId;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Invalid request: messages array is required', { status: 400 });
  }

  const usageData = await getUserUsage(userId);
  if (!usageData || usageData.limitReached) {
    return new Response(JSON.stringify({ error: 'Message limit reached' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastMessage = messages[messages.length - 1];
  const messageContent =
    Array.isArray(lastMessage.parts)
      ? lastMessage.parts.find((p: any) => p.type === 'text')?.text || ''
      : lastMessage.content || '';

  const chatResult = await startOrContinueChat(
    chatIdFromClient || null,
    messageContent,
  );
  if (chatResult?.error) {
    return new Response(chatResult.error, { status: 403 });
  }

  if (!chatResult?.chatId) {
    return new Response('Failed to create or continue chat', { status: 500 });
  }

  const chatId = chatResult.chatId;

  const fullChat = await getChat(chatId, userId);
  if (!fullChat) {
    return new Response('Chat not found after creation', { status: 500 });
  }

  const history = fullChat.messages
    .filter(m => typeof m.content === 'string')
    .map(m => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: m.content as string }],
    }));

  const selectedModel = getModelProvider(model || 'gemini/gemini-2.5-flash');

  try {
    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(history),
      system:
        'You are a helpful assistant that can answer questions and help with tasks',
      onFinish: async ({ text }) => {
        await saveAssistantMessage(chatId!, text);
      },
    });

    return result.toTextStreamResponse({
      headers: {
        'X-Chat-Id': chatId!,
        'Set-Cookie': `chatId=${chatId!}; Path=/; Max-Age=600; SameSite=Lax`,
      },
    });
  } catch (error: any) {
    console.error('AI API Error:', error);

    if (model && model !== 'gemini/gemini-2.5-flash') {
      try {
        const fallbackModel = google('gemini-2.5-flash');
        const result = streamText({
          model: fallbackModel,
          messages: convertToModelMessages(history),
          system:
            'You are a helpful assistant that can answer questions and help with tasks',
          onFinish: async ({ text }) => {
            await saveAssistantMessage(chatId!, text);
          },
        });

        return result.toTextStreamResponse({
          headers: {
            'X-Chat-Id': chatId!,
            'Set-Cookie': `chatId=${chatId!}; Path=/; Max-Age=600; SameSite=Lax`,
          },
        });
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
      }
    }

    return new Response(
      JSON.stringify({
        error: 'AI service temporarily unavailable. Please try again in a few minutes.',
        details: error.message
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
