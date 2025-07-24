'use client';

import { SESSION_REDIRECT_KEY } from '@/lib/auth/constants';
import { UserInfoFromHostServer } from '@/types/auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const redirectPreviousPage = () => {
  if (window) {
    const redirectUrl = window.sessionStorage.getItem(SESSION_REDIRECT_KEY);
    window.sessionStorage.removeItem(SESSION_REDIRECT_KEY);
    if (!redirectUrl) {
      redirect('/');
    } else {
      redirect(redirectUrl);
    }
  }
};

function SetCookieComponent({ userInfoFromHost }: { userInfoFromHost: UserInfoFromHostServer }) {
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfoFromHost),
        credentials: 'include',
      });
      if (res.status !== 200) {
        throw new Error('error 발생');
      }

      redirectPreviousPage();
    })();
  }, [userInfoFromHost]);
  return <div></div>;
}

export default SetCookieComponent;
