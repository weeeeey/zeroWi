import { COOKIE_TOKEN_KEY } from '@/lib/auth/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_TOKEN_KEY);
  return NextResponse.json({
    success: true,
  });
}
