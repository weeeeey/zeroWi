import { getUserFromDatabase } from '@/lib/auth/oauth';
import { createSessionAndSetCookie } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = await getUserFromDatabase(body);
    await createSessionAndSetCookie(userId);

    const response = NextResponse.json({ success: true });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
    return NextResponse.json('internal error', {
      status: 500,
    });
  }
}
