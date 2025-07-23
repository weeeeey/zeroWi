'use client';

import { SESSION_REDIRECT_KEY } from '@/lib/auth/constants';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function Redirect() {
  useEffect(() => {
    if (window) {
      const redirectUrl = window.sessionStorage.getItem(SESSION_REDIRECT_KEY);
      window.sessionStorage.removeItem(SESSION_REDIRECT_KEY);
      if (!redirectUrl) {
        redirect('/');
      } else {
        redirect(redirectUrl);
      }
    }
  }, []);
  return <div></div>;
}

export default Redirect;
