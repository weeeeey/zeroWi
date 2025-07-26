import { COOKIE_CONFIG, COOKIE_TOKEN_KEY, EXPIRE_AGE } from '@/lib/auth/constants';
import { User } from '@prisma/client';

import prisma from '../db';
import { getCookie } from './server';

// Prisma 클라이언트 인스턴스 (글로벌하게 한 번만 생성되도록 권장)

/**
 * 사용자 로그인 시 세션을 생성하고 쿠키를 설정합니다.
 * @param userId 로그인한 사용자의 ID
 */
export async function DeleteSessionsForPreviousBrowserId(browserDeviceId: string) {
  await prisma.session.deleteMany({
    where: {
      browserDeviceId,
    },
  });
}

export async function createSessionAndSetCookie(userId: string, browserDeviceId: string) {
  // 기존 활성 세션이 있다면 삭제 (한 사용자당 하나의 활성 세션만 허용할 경우)

  const cookieStore = await getCookie();

  // 세션 만료 시간 계산 (현재 시간 + 쿠키 maxAge)
  const expiresAt = new Date(Date.now() + EXPIRE_AGE); // maxAge는 초 단위, Date는 밀리초 단위

  // DB에 세션 정보 저장
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: expiresAt,
      browserDeviceId,
    },
  });

  // 세션 ID를 토큰으로 사용
  const sessionToken = session.id;

  const res = cookieStore.set(COOKIE_TOKEN_KEY, sessionToken, COOKIE_CONFIG);

  if (!res) throw new Error('세션 쿠키 설정에 실패');
  return sessionToken;
}

/**
 * 쿠키에서 세션 토큰을 검증하고 유효한 사용자 ID를 반환합니다.
 * @returns 유효한 경우 사용자 ID, 그렇지 않은 경우 null
 */
export async function verifySessionAndGetUserId(): Promise<User | null> {
  const cookieStore = await getCookie();
  const token = cookieStore.get(COOKIE_TOKEN_KEY)?.value || null;

  if (!token) {
    return null;
  }

  // 세션 ID로 DB에서 세션 조회
  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true }, // 사용자 정보도 함께 가져올 수 있도록
  });

  if (!session) {
    return null;
  }
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  // 세션이 유효하면 사용자 ID 반환
  return session.user;
}

/**
 * 현재 활성화된 세션을 삭제하고 쿠키를 만료시킵니다.
 */
export async function invalidateSessionAndClearCookie() {
  const cookieStore = await getCookie();
  const sessionId = cookieStore.get(COOKIE_TOKEN_KEY)?.value || '';
  if (sessionId) {
    // 세션 ID가 존재할 때만 삭제 시도
    cookieStore.delete(COOKIE_TOKEN_KEY);

    await prisma.session.deleteMany({
      where: { id: sessionId },
    });
    // 쿠키 만료
  }
}
