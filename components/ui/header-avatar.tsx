'use client';

import DropDown from '@/components/ui/drop-down';
import { useUser } from '@/hooks/use-user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function HeaderAvatar({ imageUrl, userId }: { imageUrl: string; userId: string }) {
  const { onLogin } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRouter = (href: string) => {
    router.push(href);
  };

  const handleLogout = async () => {
    const URL = window.location.href;
    try {
      setIsLoading(true);
      await fetch('/api/auth/logout');
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
      window.location.href = URL;
    }
  };

  useEffect(() => {
    onLogin(userId);
  }, [onLogin, userId]);

  return (
    <DropDown
      trigger={({ onClick }) => (
        <div
          className="relative size-10 cursor-pointer overflow-hidden rounded-full bg-slate-300 select-none"
          onClick={onClick}
        >
          <Image className="select-none" alt="avatar-image" src={imageUrl} fill />
        </div>
      )}
      items={[
        { text: '내 정보', onClick: () => handleRouter('/profile') },
        { text: '내 루틴', onClick: () => handleRouter('/routines?mine=true') },
        {
          text: '로그아웃',
          onClick: handleLogout,
          disabled: isLoading,
          danger: true,
        },
      ]}
    />
  );
}

export default HeaderAvatar;
