import { invalidateSessionAndClearCookie } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function GET() {
  await invalidateSessionAndClearCookie();
  return NextResponse.json({
    success: true,
  });
}
