'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

function HeaderAvatar({ imageUrl }: { imageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/logout');
      if (!res.ok) throw new Error('로그아웃 실패');
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <div
        className="relative size-10 cursor-pointer overflow-hidden rounded-full bg-slate-300 select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image className="select-none" alt="avatar-image" src={imageUrl} fill />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-40 origin-top-right rounded-md bg-black text-white shadow-lg">
          <div className="border-b border-white/10 px-4 py-2 text-sm font-semibold">My Account</div>
          <Link
            href="/profile"
            className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
          >
            내 정보
          </Link>
          <Link
            href="/routines?mine=true"
            className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
          >
            내 루틴
          </Link>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10 disabled:opacity-50"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default HeaderAvatar;
