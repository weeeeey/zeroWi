'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { communityCategoriesWithTotal } from '@/lib/community/constant';
import { cn } from '@/lib/utils';
import { CommunityCategoryWithTotal } from '@/types/community';
import { Search, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

function CommunityHeader({ curCategory }: { curCategory: CommunityCategoryWithTotal }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleSearchValue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get('search')?.toString().trim();

    if (searchValue) {
      window.location.href = `/community?search=${encodeURIComponent(searchValue)}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Handle category click
  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(window.location.search);

    params.set('category', category);
    params.set('page', '1');
    params.delete('search');
    const queryString = `?${params.toString()}`;
    window.location.href = `/community${queryString}`;
  };

  return (
    <div className="shadow-slate-20 sticky inset-0 top-16 z-20 space-y-4 bg-slate-100 py-4 shadow-xl">
      {/* Filter */}
      <div className="flex items-center justify-between gap-x-1 px-2">
        {/* 1 */}
        <div className="flex max-w-full gap-x-1 overflow-x-auto py-1 whitespace-nowrap">
          {communityCategoriesWithTotal.map((category) => (
            <Button
              key={category}
              variant={category === '전체' ? 'default' : 'outline'}
              size="sm"
              className={
                category === curCategory ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''
              }
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div ref={inputRef} className="relative w-20 shrink-0">
          <button
            onClick={() => setSearchOpen((p) => !p)}
            className="relative flex h-8 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-600 text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
          >
            {/* 검색 아이콘과 텍스트 */}
            <div
              className={`absolute inset-0 ml-1 flex items-center transition-all duration-500 ease-in-out ${
                searchOpen
                  ? 'translate-y-full transform opacity-0'
                  : 'translate-y-0 transform opacity-100'
              }`}
            >
              <Search className="mx-1 size-5" />
              <span className="font-semibold">검색</span>
            </div>

            {/* 닫기 아이콘과 텍스트 */}
            <div
              className={`absolute inset-0 ml-1 flex items-center transition-all duration-500 ease-in-out ${
                searchOpen
                  ? 'translate-y-0 transform opacity-100'
                  : '-translate-y-full transform opacity-0'
              }`}
            >
              <X className="mx-1 size-5" />
              <span className="font-semibold">닫기</span>
            </div>
          </button>
          <form
            className={cn(
              'absolute top-[110%] right-0 flex h-12 w-60 origin-top-right flex-col justify-center overflow-hidden text-white transition-all',
              searchOpen ? 'scale-100' : 'scale-0'
            )}
            onSubmit={handleSearchValue}
          >
            <button
              type="submit"
              className="absolute top-1/2 left-2 size-6 -translate-y-1/2 cursor-pointer rounded-md p-1 hover:bg-blue-300 hover:text-black"
            >
              <Search className="size-full stroke-3" />
            </button>

            <Input
              name="search"
              placeholder="검색어 입력"
              maxLength={30}
              className="bg-blue-600 py-5 pl-8 placeholder:text-slate-200"
              alt="search-input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommunityHeader;
