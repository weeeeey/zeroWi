import {
  AuthHostType,
  FormDataPropsType,
  OAuthHostType,
  UserInfoFromHostServer,
} from '@/types/auth';

import prisma from '../db';
import {
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_ENDPOINT,
  HOST_FORM_DATA,
  KAKAO_TOKEN_ENDPOINT,
  KAKAO_USERINFO_ENDPOINT,
  OAUTH_HOSTS,
} from './constants';

/**
 * 주어진 값이 허용된 OAuth 호스트인지 검증합니다.
 *
 * @param {string} value - 검증할 호스트 값.
 * @returns {boolean} 허용된 호스트이면 `true`, 그렇지 않으면 `false`.
 */
export const isValidHost = (value: string): boolean => {
  if (OAUTH_HOSTS.includes(value as OAuthHostType)) return true;
  return false;
};

/**
 * OAuth 호스트 서버로 전송할 FormData를 생성합니다.
 *
 * @param {OAuthHostType} host - OAuth 호스트 타입 (예: 'google', 'kakao').
 * @param {string} code - 인증 코드.
 * @returns {URLSearchParams} 호스트 서버로 전송할 FormData 객체.
 */
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

/**
 * OAuth 호스트 서버로부터 액세스 토큰을 가져옵니다.
 *
 * @param {OAuthHostType} host - OAuth 호스트 타입.
 * @param {string} code - 인증 코드.
 * @returns {Promise<string>} 액세스 토큰.
 * @throws {Error} 서버로부터 토큰 발급 오류 발생 시.
 */
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

/**
 * OAuth 호스트 서버로부터 사용자 정보를 가져옵니다.
 *
 * @param {string} accessToken - 액세스 토큰.
 * @param {AuthHostType} host - 인증 호스트 타입.
 * @returns {Promise<UserInfoFromHostServer>} 호스트 서버로부터 가져온 사용자 정보.
 * @throws {Error} 서버로부터 유저 정보 가져오기 실패 시.
 */
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

/**
 * 데이터베이스에서 사용자 정보를 조회하거나, 없으면 새로 생성합니다.
 *
 * @param {UserInfoFromHostServer} userInfo - 호스트 서버로부터 가져온 사용자 정보.
 * @returns {Promise<string>} 사용자 ID.
 * @throws {Error} 사용자 정보를 가져오거나 생성하는 데 실패 시.
 */
export const getUserFromDatabase = async (userInfo: UserInfoFromHostServer): Promise<string> => {
  const { email, name, picture } = userInfo;

  try {
    // 먼저 유저가 있는지 확인
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          picture,
        },
      });
    }

    return user.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get or create user: ${error.message}`);
    }
    throw error;
  }
};