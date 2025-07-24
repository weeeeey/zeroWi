'use client';

import { UserInfoFromHostServer } from '@/types/auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

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
      redirect('/auth/redirect');
    })();
  }, [userInfoFromHost]);
  return <div></div>;
}

export default SetCookieComponent;
