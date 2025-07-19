import {
  AuthHostType,
  FormDataPropsType,
  OAuthHostType,
  UserInfoFromHostServer,
} from '@/types/auth';
import { User } from '@/types/user';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  COOKIE_TOKEN_KEY,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_ENDPOINT,
  HOST_FORM_DATA,
  KAKAO_TOKEN_ENDPOINT,
  KAKAO_USERINFO_ENDPOINT,
  OAUTH_HOSTS,
} from './constants';

// oauth redirect page 접근시 허용된 host인지 검증
export const isValidHost = (value: string): boolean => {
  if (OAUTH_HOSTS.includes(value as OAuthHostType)) return true;
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

const getFormData = (host: OAuthHostType, code: string) => {
  const formData = new URLSearchParams();
  const hostFormData = HOST_FORM_DATA[host];
  formData.append('grant_type', 'authorization_code');
  for (const key of Object.keys(hostFormData)) {
    formData.append(key, hostFormData[key as keyof FormDataPropsType]);
  }

  formData.append('code', code);
  return formData;
};

export const getAccessTokenFromHostServer = async (
  host: OAuthHostType,
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

  if (!res.ok) throw new Error('서버로부터 토큰 발급 오류 발생');
  const data = await res.json();
  return data.access_token;
};

export const getUserInfoFromHostServer = async (
  accessToken: string,
  host: AuthHostType
): Promise<UserInfoFromHostServer> => {
  let userInfoEndpoint = '';
  let headers: HeadersInit = {};

  // header 및 엔드포인트 설정
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
    throw new Error(`서버로부터 유저 정보 가져오기 실패`);
  }

  const data = await res.json();
  let userInfo: UserInfoFromHostServer | null = null;

  // 데이터 가공
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
