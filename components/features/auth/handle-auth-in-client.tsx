'use client';

import { useUser } from '@/hooks/use-user';
import { BROWSER_DEVICEID_KEY, SESSION_REDIRECT_KEY, URL_ORIGIN } from '@/lib/auth/constants';
import { UserInfoFromHostServer } from '@/types/auth';
import { useEffect } from 'react';

const redirectPreviousPage = () => {
  if (window) {
    const redirectUrl = window.sessionStorage.getItem(SESSION_REDIRECT_KEY) || URL_ORIGIN!;
    window.sessionStorage.removeItem(SESSION_REDIRECT_KEY);
    window.location.href = redirectUrl;
  }
};

export default function HandleAuthInClient({
  userInfoFromHost,
}: {
  userInfoFromHost: UserInfoFromHostServer;
}) {
  useEffect(() => {
    (async () => {
      let browserId = window.localStorage.getItem(BROWSER_DEVICEID_KEY);
      if (!browserId) {
        browserId = crypto.randomUUID();
        window.localStorage.setItem(BROWSER_DEVICEID_KEY, browserId);
      }

      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfoFromHost,
          browserId,
        }),
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
