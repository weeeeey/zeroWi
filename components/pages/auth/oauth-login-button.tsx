'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface OauthLoginButtonProps {
  children: React.ReactNode;
  className?: string;
  handleLogin: () => void;
}
export function OauthLoginButton({ children, className, handleLogin }: OauthLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    handleLogin();
  };

  return (
    <div className="space-y-3">
      <button onClick={handleClick} disabled={isLoading} className="mx-auto block h-12 w-64">
        {isLoading ? (
          <span
            className={cn(
              'flex h-full items-center justify-center gap-2 rounded-xl px-4 py-2',
              className
            )}
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="font-bold">연결 중...</span>
          </span>
        ) : (
          <span
            className={cn('flex items-center justify-center gap-2 rounded-xl px-4 py-2', className)}
          >
            {children}
          </span>
        )}
      </button>
    </div>
  );
}
