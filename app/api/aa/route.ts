import { COOKIE_TOKEN_KEY } from '@/lib/auth/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const coo = await cookies();
  const a = coo.get(COOKIE_TOKEN_KEY);
  console.log(a?.value);
  return NextResponse.json({
    qweqwe: 'asdzxc',
  });
}
