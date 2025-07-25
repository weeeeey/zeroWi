'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { useEffect } from 'react';

function LoginButton() {
  const { onOpen } = useModal();
  // useEffect(() => {
  //   (async () => {
  //     await fetch('/api/auth/logout');
  //   })();
  // }, []);

  return <Button onClick={() => onOpen('LOGIN')}>로그인</Button>;
}

export default LoginButton;
