import { COOKIE_TOKEN_KEY } from '@/lib/auth/constants';
import { getUserFromDatabase } from '@/lib/auth/oauth';
import { createSessionAndSetCookie } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = await getUserFromDatabase(body);
    const cookieSetResult = await createSessionAndSetCookie(userId);

    const cookieStore = await cookies();

    return NextResponse.json({
      success: true,
    });
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
