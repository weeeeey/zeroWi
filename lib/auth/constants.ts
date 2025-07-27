import type { FormDataPropsType, OAuthHostType } from '@/types/auth';

export const URL_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOP_URL
    : process.env.NEXT_PUBLIC_DEPLOY_URL;

export const OAUTH_HOSTS: OAuthHostType[] = ['google', 'kakao'];
export const SESSION_REDIRECT_KEY = 'sessionRedirectUrl';

export const GOOGLE_REDIRECT_URI = `${URL_ORIGIN}/auth/callback/google`;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
export const GOOGLE_TOKEN_ENDPOINT = `https://oauth2.googleapis.com/token`;
export const GOOGLE_USERINFO_ENDPOINT = `https://www.googleapis.com/oauth2/v2/userinfo`;

export const KAKAO_REDIRECT_URI = `${URL_ORIGIN}/auth/callback/kakao`;
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
export const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET!;
export const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const KAKAO_TOKEN_ENDPOINT = `https://kauth.kakao.com/oauth/token`;
export const KAKAO_USERINFO_ENDPOINT = `https://kapi.kakao.com/v2/user/me`;

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

export const COOKIE_TOKEN_KEY = 'auth-token';
export const BROWSER_DEVICEID_KEY = 'browserDeviceId';

export const EXPIRE_AGE = 60 * 60 * 24 * 30;
export const EXPIREAT = new Date(Date.now() + EXPIRE_AGE * 1000);

export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  expires: EXPIREAT,
  path: '/',
  sameSite: 'lax' as const,
};
