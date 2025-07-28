'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';

function LoginButton({ className, text }: { className?: string; text?: string }) {
  const { onOpen } = useModal();

  return (
    <Button className={className} onClick={() => onOpen('LOGIN')}>
      {text ? text : '로그인'}
    </Button>
  );
}

export default LoginButton;
