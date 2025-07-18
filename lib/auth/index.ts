import { AuthHostType, UserInfoFromHostServer } from '@/types/auth';
import { User } from '@/types/user';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  AUTH_HOSTS,
  COOKIE_TOKEN_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_ENDPOINT,
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET,
  KAKAO_REDIRECT_URI,
  KAKAO_TOKEN_ENDPOINT,
  KAKAO_USERINFO_ENDPOINT,
} from './constants';

// oauth redirect page 접근시 허용된 host인지 검증
export const isValidHost = (value: string): boolean => {
  if (AUTH_HOSTS.includes(value as AuthHostType)) return true;
  return false;
};

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

const getFormData = (host: AuthHostType, code: string) => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');

  if (host === 'google') {
    formData.append('client_id', GOOGLE_CLIENT_ID);
    formData.append('client_secret', GOOGLE_CLIENT_SECRET);
    formData.append('redirect_uri', GOOGLE_REDIRECT_URI);
  } else if (host === 'kakao') {
    formData.append('client_id', KAKAO_CLIENT_ID);
    formData.append('client_secret', KAKAO_CLIENT_SECRET);
    formData.append('redirect_uri', KAKAO_REDIRECT_URI);
  }

  formData.append('code', code);
  return formData;
};

export const getAccessTokenFromHostServer = async (
  host: AuthHostType,
  code: string
): Promise<string> => {
  let endPoint = '';

  if (host === 'google') {
    endPoint = GOOGLE_TOKEN_ENDPOINT;
  } else if (host === 'kakao') {
    endPoint = KAKAO_TOKEN_ENDPOINT;
  }

  const formData = getFormData(host, code);
  const res = await fetch(endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: formData.toString(),
  });

  if (!res.ok) throw new Error('인가 서버로부터 토큰 발급 오류 발생');
  const data = await res.json();
  return data.access_token;
};

export const getUserInfo = async (
  accessToken: string,
  host: AuthHostType
): Promise<UserInfoFromHostServer> => {
  let userInfoEndpoint = '';
  let headers: HeadersInit = {};

  if (host === 'google') {
    userInfoEndpoint = GOOGLE_USERINFO_ENDPOINT;
    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  } else if (host === 'kakao') {
    userInfoEndpoint = KAKAO_USERINFO_ENDPOINT;
    headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
  }

  const res = await fetch(userInfoEndpoint, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  const data = await res.json();
  let userInfo: UserInfoFromHostServer | null = null;

  if (host !== 'google') {
    userInfo = {
      id: data.id,
      email: data.kakao_account.email,
      name: data.kakao_account.profile.nickname,
      picture: data.kakao_account.profile.profile_image_url,
    };
  } else {
    userInfo = {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };
  }

  return userInfo;
};
