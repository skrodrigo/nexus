import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { saveAssistantMessage } from '@/server/chat';

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    chatId,
  }: { messages: UIMessage[]; model: string; chatId: string } = await req.json();

  if (!chatId) {
    return new Response('Bad Request: chatId is required', { status: 400 });
  }

  const result = streamText({
    model: 'perplexity/sonar',
    messages: convertToModelMessages(messages),
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
    onFinish: async ({ text }) => {
      await saveAssistantMessage(chatId, text);
    },
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}