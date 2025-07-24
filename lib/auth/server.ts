import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import 'server-only';

import { verifySessionAndGetUserId } from './session';

// 서버 컴포넌트에서 접근 가능한 쿠기 스토어 생성
export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore;
}

// 서버 액션으로 현재 로그인 된 유저 정보 가져오기
export async function getCurrentUser(): Promise<User | null> {
  const user = await verifySessionAndGetUserId();
  if (!user) {
    return null;
  }

  return user;
}
