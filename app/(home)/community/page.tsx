import {
  CommunityCreateLinkButton,
  CommunityHeader,
  CommunityPagination,
  CommunityPostList,
  CommunityPostListSkeleton,
} from '@/components/features/community';
import { communityCategoriesWithTotal } from '@/lib/community/constant';
import { CommunityCategoryWithTotal } from '@/types/community';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    search: string;
    page: string;
    category: string;
  }>;
}

async function CommunityPage({ searchParams }: PageProps) {
  const { search, page, category } = await searchParams;
  let curPage = parseInt(page);
  let curCategory = category;
  // 숫자가 아니거나 (NaN) 1보다 작으면 1로 설정
  if (isNaN(curPage) || curPage < 1) {
    curPage = 1;
  }
  if (
    !curCategory ||
    !communityCategoriesWithTotal.includes(curCategory as CommunityCategoryWithTotal)
  ) {
    curCategory = '전체';
  }

  return (
    <div className="container space-y-4 p-0">
      <CommunityHeader curCategory={curCategory as CommunityCategoryWithTotal} />

      {/* Posts List */}
      <div className="h-full min-h-[47vh]">
        <Suspense fallback={<CommunityPostListSkeleton />}>
          <CommunityPostList
            curPage={curPage}
            search={search}
            category={curCategory as CommunityCategoryWithTotal}
          />
        </Suspense>
      </div>

      {/* Pagination */}

      <Suspense>
        <CommunityPagination curPage={curPage} />
      </Suspense>

      <CommunityCreateLinkButton />
    </div>
  );
}

export default CommunityPage;
