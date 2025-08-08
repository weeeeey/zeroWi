'use client';

import { GOOGLE_URL, KAKAO_URL, SESSION_REDIRECT_KEY } from '@/lib/auth/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useState } from 'react';

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

export function OauthLoginButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback((host: OauthHost) => {
    setIsLoading(true);
    const pathname = window.location.pathname;
    if (pathname.startsWith('/auth')) {
      window.sessionStorage.setItem(SESSION_REDIRECT_KEY, window.location.origin);
    } else {
      window.sessionStorage.setItem(SESSION_REDIRECT_KEY, window.location.href);
    }
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
  }, []);

  return (
    <ul className="space-y-4 px-2">
      <OauthLoginButton host="kakao" handleClick={handleClick} isLoading={isLoading} />
      <OauthLoginButton host="google" handleClick={handleClick} isLoading={isLoading} />
    </ul>
  );
}

interface OauthLoginButtonProps {
  host: OauthHost;
  handleClick: (host: OauthHost) => void;
  isLoading: boolean;
}

function OauthLoginButton({ host, handleClick, isLoading }: OauthLoginButtonProps) {
  const { style, imageUrl, labelText } = OauthHosts[host];

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleClick(host)}
        disabled={isLoading}
        className={cn(
          'mx-auto block h-12 w-64 cursor-pointer rounded-xl px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50',
          style
        )}
      >
        <span className="flex h-full items-center justify-center gap-2">
          {isLoading === false ? (
            <div className="relative size-8">
              <Image src={imageUrl} className="absolute" fill alt={`${host} 로그인 버튼`} />
            </div>
          ) : (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}

          <span className="font-bold">{isLoading ? labelText : '로그인 중...'}</span>
        </span>
      </button>
    </div>
  );
}
