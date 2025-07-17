import type { AuthHostType } from '@/types/auth';

const AUTH_HOSTS: AuthHostType[] = ['credential', 'google', 'kakao'];

const GOOGLE_REDIRECT_URI = '/auth/callback/google';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;

const KAKAO_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_REDIRECT_URI = '/auth/callback/kakao';
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID!;
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET!;

const COOKIE_CONFIG = {
  AUTH_TOKEN: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    sameSite: 'lax' as const,
  },
  OAUTH_STATE: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
    sameSite: 'lax' as const,
  },
};

export {
  AUTH_HOSTS,
  COOKIE_CONFIG,
  GOOGLE_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  KAKAO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET,
  KAKAO_REDIRECT_URI,
};
