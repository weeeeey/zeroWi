import {
  CommunityCreateLinkButton,
  CommunityHeader,
  CommunityPagination,
  CommunityPostList,
} from '@/components/features/community';
import CommunityPostListSkeleton from '@/components/features/community/community-post-list-skeleton';
import { Suspense } from 'react';

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
        <Suspense fallback={<CommunityPostListSkeleton />}>
          <CommunityPostList curPage={curPage} search={search} />
        </Suspense>
      </div>

      {/* Pagination */}

      <CommunityPagination curPage={curPage} />

      <CommunityCreateLinkButton />
    </div>
  );
}

export default CommunityPage;
