import { COOKIE_CONFIG, COOKIE_TOKEN_KEY, EXPIREAT } from '@/lib/auth/constants';
import { User } from '@prisma/client';

import prisma from '../db';
import { getCookie } from './server';

/**
 * 특정 브라우저 ID에 연결된 이전 세션들을 삭제합니다.
 * 이는 한 사용자당 하나의 활성 세션만 허용하는 정책을 구현할 때 유용합니다.
 *
 * @param {string} browserDeviceId - 삭제할 세션들의 브라우저 장치 ID.
 */
export async function DeleteSessionsForPreviousBrowserId(browserDeviceId: string) {
  await prisma.session.deleteMany({
    where: {
      browserDeviceId,
    },
  });
}

/**
 * 사용자 로그인 시 새로운 세션을 생성하고 세션 ID를 쿠키에 설정합니다.
 *
 * @param {string} userId - 로그인한 사용자의 ID.
 * @param {string} browserDeviceId - 사용자의 브라우저 또는 장치 ID.
 * @returns {Promise<string>} 생성된 세션의 토큰 (ID).
 * @throws {Error} 세션 쿠키 설정에 실패 시.
 */
export async function createSessionAndSetCookie(userId: string, browserDeviceId: string) {
  const cookieStore = await getCookie();

  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: EXPIREAT,
      browserDeviceId,
    },
  });

  const sessionToken = session.id;

  const res = cookieStore.set(COOKIE_TOKEN_KEY, sessionToken, COOKIE_CONFIG);

  if (!res) throw new Error('세션 쿠키 설정에 실패');
  return sessionToken;
}

/**
 * 쿠키에서 세션 토큰을 검증하고 유효한 사용자 정보를 반환합니다.
 * 세션이 유효하지 않거나 만료된 경우 `null`을 반환합니다.
 *
 * @returns {Promise<User | null>} 유효한 세션의 사용자 정보 또는 `null`.
 */
export async function verifySessionAndGetUserId(): Promise<User | null> {
  const cookieStore = await getCookie();
  const token = cookieStore.get(COOKIE_TOKEN_KEY)?.value || null;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true },
  });

  if (!session) {
    return null;
  }
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session.user;
}

/**
 * 현재 활성화된 세션을 삭제하고 쿠키를 만료시킵니다.
 * 쿠키에 세션 ID가 존재할 경우에만 세션 삭제를 시도합니다.
 */
export async function invalidateSessionAndClearCookie() {
  const cookieStore = await getCookie();
  const sessionIdInCookie = cookieStore.get(COOKIE_TOKEN_KEY)?.value || '';
  if (sessionIdInCookie) {
    cookieStore.delete(COOKIE_TOKEN_KEY);

    await prisma.session.deleteMany({
      where: { id: sessionIdInCookie },
    });
  }
}