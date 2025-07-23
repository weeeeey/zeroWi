import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

import prisma from '../db';
import { invalidateSessionAndClearCookie, verifySessionAndGetUserId } from './session';

// 서버 컴포넌트에서 접근 가능한 쿠기 스토어 생성
export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore;
}

// 서버 액션으로 현재 로그인 된 유저 정보 가져오기
export async function getCurrentUser(): Promise<User | null> {
  const userId = await verifySessionAndGetUserId();
  if (!userId) {
    await invalidateSessionAndClearCookie();
    return null;
  }
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userInfo) {
    return null;
  }
  return userInfo;
}

// 서버 액션으로 쿠키 정보 삭제로 로그아웃 처리
export async function logoutAction() {
  await invalidateSessionAndClearCookie();
  revalidatePath('/');
  redirect('/');
}
