import {
  AuthHostType,
  FormDataPropsType,
  OAuthHostType,
  UserInfoFromHostServer,
} from '@/types/auth';
import { User } from '@prisma/client';

import prisma from '../db';
import {
  EXPIRE_AGE,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_ENDPOINT,
  HOST_FORM_DATA,
  KAKAO_TOKEN_ENDPOINT,
  KAKAO_USERINFO_ENDPOINT,
  OAUTH_HOSTS,
} from './constants';
import { createSessionAndSetCookie } from './session';

// oauth redirect page 접근시 허용된 host인지 검증
export const isValidHost = (value: string): boolean => {
  if (OAUTH_HOSTS.includes(value as OAuthHostType)) return true;
  return false;
};

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

export const getUserFromDatabase = async (userInfo: UserInfoFromHostServer): Promise<string> => {
  const { email, name, picture } = userInfo;

  const now = Date.now();
  const expireAt = new Date(now + EXPIRE_AGE * 1000); // 만료 시간 Date 객체

  try {
    // 먼저 유저가 있는지 확인
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // 유저가 없다면 생성 + 세션도 함께 생성
      user = await prisma.user.create({
        data: {
          email,
          name,
          picture,
        },
      });
    }
    await createSessionAndSetCookie(user.id);

    return user.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get or create user: ${error.message}`);
    }
    throw error;
  }
};
