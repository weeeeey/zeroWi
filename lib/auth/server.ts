import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import 'server-only';

import { verifySessionAndGetUserId } from './session';

/**
 * 서버 컴포넌트에서 접근 가능한 쿠키 스토어를 가져옵니다.
 * `next/headers`의 `cookies()` 함수를 래핑합니다.
 *
 * @returns {Promise<ReturnType<typeof cookies>>} 쿠키 스토어 객체.
 */
export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore;
}

/**
 * 현재 로그인된 사용자 정보를 가져옵니다.
 * 세션을 확인하고 사용자 ID를 통해 데이터베이스에서 사용자 정보를 조회합니다.
 * 이 함수는 서버 액션 또는 서버 컴포넌트에서 사용됩니다.
 *
 * @returns {Promise<User | null>} 로그인된 사용자 정보 또는 로그인되어 있지 않다면 `null`.
 */
export async function getCurrentUser(): Promise<User | null> {
  const user = await verifySessionAndGetUserId();

  if (!user) {
    return null;
  }

  return user;
}