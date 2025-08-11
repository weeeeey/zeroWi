import type { FormDataPropsType, OAuthHostType } from '@/types/auth';

/**
 * 애플리케이션의 원본(Origin) URL을 정의합니다.
 * 개발 환경과 배포 환경에 따라 다르게 설정됩니다.
 */
export const URL_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOP_URL
    : process.env.NEXT_PUBLIC_DEPLOY_URL;

/**
 * 허용된 OAuth 호스트 목록입니다.
 */
export const OAUTH_HOSTS: OAuthHostType[] = ['google', 'kakao'];

/**
 * 세션 리다이렉트 URL을 저장하는 데 사용되는 키입니다.
 */
export const SESSION_REDIRECT_KEY = 'sessionRedirectUrl';

/**
 * 로그인 모달을 열기 위한 검색 파라미터 키입니다.
 */
export const LOGIN_MODAL_OPEN_SEARCHPARAMS_KEY = 'loginRequired';

/**
 * Google OAuth 리다이렉트 URI입니다.
 */
export const GOOGLE_REDIRECT_URI = `${URL_ORIGIN}/auth/callback/google`;
/**
 * Google OAuth 클라이언트 ID입니다.
 */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
/**
 * Google OAuth 클라이언트 시크릿입니다.
 */
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
/**
 * Google OAuth 인증 URL입니다.
 */
export const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
/**
 * Google OAuth 토큰 엔드포인트입니다.
 */
export const GOOGLE_TOKEN_ENDPOINT = `https://oauth2.googleapis.com/token`;
/**
 * Google OAuth 사용자 정보 엔드포인트입니다.
 */
export const GOOGLE_USERINFO_ENDPOINT = `https://www.googleapis.com/oauth2/v2/userinfo`;

/**
 * Kakao OAuth 리다이렉트 URI입니다.
 */
export const KAKAO_REDIRECT_URI = `${URL_ORIGIN}/auth/callback/kakao`;
/**
 * Kakao OAuth 클라이언트 ID입니다.
 */
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
/**
 * Kakao OAuth 클라이언트 시크릿입니다.
 */
export const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET!;
/**
 * Kakao OAuth 인증 URL입니다.
 */
export const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
/**
 * Kakao OAuth 토큰 엔드포인트입니다.
 */
export const KAKAO_TOKEN_ENDPOINT = `https://kauth.kakao.com/oauth/token`;
/**
 * Kakao OAuth 사용자 정보 엔드포인트입니다.
 */
export const KAKAO_USERINFO_ENDPOINT = `https://kapi.kakao.com/v2/user/me`;

/**
 * 각 OAuth 호스트별 폼 데이터 속성을 정의합니다.
 */
export const HOST_FORM_DATA: Record<OAuthHostType, FormDataPropsType> = {
  google: {
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
  },
  kakao: {
    redirect_uri: KAKAO_REDIRECT_URI,
    client_id: KAKAO_CLIENT_ID,
    client_secret: KAKAO_CLIENT_SECRET,
  },
};

/**
 * 인증 토큰을 저장하는 쿠키의 키입니다.
 */
export const COOKIE_TOKEN_KEY = 'auth-token';
/**
 * 브라우저 장치 ID를 저장하는 쿠키의 키입니다.
 */
export const BROWSER_DEVICEID_KEY = 'browserDeviceId';

/**
 * 세션 만료 기간 (초 단위)입니다. (예: 30일)
 */
export const EXPIRE_AGE = 60 * 60 * 24 * 30;
/**
 * 세션 만료 시점 (Date 객체)입니다.
 */
export const EXPIREAT = new Date(Date.now() + EXPIRE_AGE * 1000);

/**
 * 세션 쿠키 설정입니다.
 */
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  expires: EXPIREAT,
  path: '/',
  sameSite: 'lax' as const,
};