'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

function HeaderAvatar({ imageUrl }: { imageUrl: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/logout');
      if (!res.ok) throw new Error('로그아웃 실패');

      router.refresh();
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative size-10 overflow-hidden rounded-full select-none">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image className="cursor-pointer" alt="avatar-image" src={imageUrl} fill />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute top-full bg-black text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>내 정보</DropdownMenuItem>
          <DropdownMenuItem>내 루틴</DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} onClick={handleLogout}>
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderAvatar;
