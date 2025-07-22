import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIE_TOKEN_KEY } from './constants';

// 서버 컴포넌트에서 접근 가능한 쿠기 스토어 생성
async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore;
}

// 서버 액션으로 현재 로그인 된 유저 정보 가져오기
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await getCookie();
  try {
    const token = cookieStore.get(COOKIE_TOKEN_KEY)?.value;
    if (!token) return null;

    // const secret = new TextEncoder().encode(JWT_SECRET)

    try {
      //   const { payload } = await jose.jwtVerify(token, secret)
      return null;
    } catch (jwtError) {
      cookieStore.delete(COOKIE_TOKEN_KEY);
      return null;
    }
  } catch (error) {
    cookieStore.delete(COOKIE_TOKEN_KEY);
    return null;
  }
}

// 서버 액션으로 쿠키 정보 삭제로 로그아웃 처리
export async function logoutAction() {
  const cookieStore = await getCookie();
  cookieStore.delete(COOKIE_TOKEN_KEY);
  revalidatePath('/');
  redirect('/');
}
