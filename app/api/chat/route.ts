import { handleChatRequest } from '@/server/chat';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    return await handleChatRequest(req);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}