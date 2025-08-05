'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CommunityPaginationProps {
  curPage: number;
}

function CommunityPagination({ curPage }: CommunityPaginationProps) {
  const totalPages = 5;
  const searchParams = useSearchParams();

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 기존 searchParams를 유지하면서 page만 변경하는 함수
  const createPageQuery = (page: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    return {
      ...currentParams,
      page: page.toString(),
    };
  };

  return (
    <div className="mb-40 flex justify-center">
      <div className="flex gap-2">
        {/* 이전 버튼 */}
        {curPage === 1 ? (
          <Button variant="outline" size="sm" disabled className="px-3">
            이전
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="px-3" asChild>
            <Link
              href={{
                pathname: '/community',
                query: createPageQuery(curPage - 1),
              }}
            >
              이전
            </Link>
          </Button>
        )}

        {/* 페이지 번호들 */}
        {getPageNumbers().map((page) =>
          page === curPage ? (
            <Button
              key={page}
              size="sm"
              className="bg-indigo-600 px-4 text-white hover:bg-indigo-700"
              aria-current="page"
            >
              {page}
            </Button>
          ) : (
            <Button
              key={page}
              variant="outline"
              size="sm"
              className="bg-white px-4 text-black hover:bg-slate-100"
              asChild
            >
              <Link
                href={{
                  pathname: '/community',
                  query: createPageQuery(page),
                }}
              >
                {page}
              </Link>
            </Button>
          )
        )}

        {/* 다음 버튼 */}
        {curPage === totalPages ? (
          <Button variant="outline" size="sm" disabled className="px-3">
            다음
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="px-3" asChild>
            <Link
              href={{
                pathname: '/community',
                query: createPageQuery(curPage + 1),
              }}
            >
              다음
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default CommunityPagination;
