'use client';

import { GOOGLE_URL, KAKAO_URL, SESSION_REDIRECT_KEY } from '@/lib/auth/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

type OauthHost = 'kakao' | 'google';
type OauthHostProps = {
  labelText: string;
  style: string;
  imageUrl: string;
};
const OauthHosts: Record<OauthHost, OauthHostProps> = {
  kakao: {
    labelText: '카카오 계정으로 로그인',
    style: 'bg-yellow-400',
    imageUrl: '/images/kakao-logo.svg',
  },
  google: {
    labelText: '구글 계정으로 로그인',
    style: 'bg-slate-100 outline-2',
    imageUrl: '/images/google-logo.svg',
  },
};

interface OauthLoginButtonProps {
  host: OauthHost;
}
export function OauthLoginButton({ host }: OauthLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { style, imageUrl, labelText } = OauthHosts[host];

  const handleClick = () => {
    setIsLoading(true);
    window.sessionStorage.setItem(SESSION_REDIRECT_KEY, window.location.href);
    let url;
    switch (host) {
      case 'kakao': {
        url = KAKAO_URL;
        break;
      }
      case 'google': {
        url = GOOGLE_URL;
        break;
      }
      default: {
        url = 'undefined';
      }
    }

    window.location.href = url;
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn('mx-auto block h-12 w-64 rounded-xl px-4 py-2', style)}
      >
        {isLoading ? (
          <span className="flex h-full items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="font-bold">연결 중...</span>
          </span>
        ) : (
          <span className="flex h-full items-center justify-center gap-2">
            <div className="relative size-8">
              <Image src={imageUrl} className="absolute" fill alt={`${host} 로그인 버튼`} />
            </div>
            <span className="font-bold">{labelText}</span>
          </span>
        )}
      </button>
    </div>
  );
}
