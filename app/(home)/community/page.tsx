import {
  CommunityHeader,
  CommunityPagination,
  CommunityPostList,
} from '@/components/features/community';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    search: string;
    page: string;
  }>;
}

async function CommunityPage({ searchParams }: PageProps) {
  const { search, page } = await searchParams;
  let curPage = parseInt(page);

  // 숫자가 아니거나 (NaN) 1보다 작으면 1로 설정
  if (isNaN(curPage) || curPage < 1) {
    curPage = 1;
  }

  return (
    <div className="container space-y-4 p-0">
      <CommunityHeader />
      {/* Posts List */}
      <div className="h-full min-h-[47vh]">
        <CommunityPostList curPage={curPage} search={search} />
      </div>

      {/* Pagination */}
      <CommunityPagination curPage={curPage} />

      <Link
        href={'/community/create'}
        className="fixed bottom-6 left-1/2 z-10 translate-x-[calc(8rem+1px)] -translate-y-full cursor-pointer rounded-full bg-blue-400 p-4 ring-1 ring-indigo-500 ring-offset-2 hover:bg-blue-500"
      >
        <Plus className="size-7 text-white" />
      </Link>
    </div>
  );
}

export default CommunityPage;
