import { invalidateSessionAndClearCookie } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

/**
 * 사용자 로그아웃을 처리하는 API 라우트입니다.
 * 현재 활성화된 세션을 무효화하고 관련 쿠키를 삭제합니다.
 */
export async function GET() {
  await invalidateSessionAndClearCookie();
  return NextResponse.json({
    success: true,
  });
}
