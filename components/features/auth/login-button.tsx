'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';

function LoginButton() {
  const { onOpen } = useModal();
  return <Button onClick={() => onOpen('LOGIN')}>로그인</Button>;
}

export default LoginButton;
