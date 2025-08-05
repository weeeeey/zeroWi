import { Card, CardContent } from '@/components/ui/card';

export default function CommunityPostListSkeleton() {
  return (
    <div className="space-y-4 px-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="p-0">
          <CardContent className="px-4 py-6">
            <div className="animate-pulse">
              {/* 작성자 정보 및 포스트 태그 */}
              <div className="mb-2 flex items-start gap-x-2">
                {/* 작성자 이미지 skeleton */}
                <div className="size-10 rounded-full bg-gray-200" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-2">
                    {/* 카테고리 배지 skeleton */}
                    <div className="h-5 w-16 rounded-full bg-gray-200" />
                    {/* 인기 배지 skeleton (랜덤하게 표시) */}
                    {index % 3 === 0 && <div className="h-5 w-8 rounded-full bg-gray-200" />}
                  </div>
                  {/* 작성자 이름 skeleton */}
                  <div className="mt-1 ml-[2px] h-3 w-12 rounded bg-gray-200" />
                </div>
              </div>

              {/* 제목 skeleton */}
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

              {/* 내용 skeleton (2줄) */}
              <div className="mb-6 space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>

              {/* 포스트 추가 정보 skeleton */}
              <div className="flex items-center justify-between">
                {/* 생성일 skeleton */}
                <div className="h-4 w-20 rounded bg-gray-200" />

                {/* 통계 정보 skeleton */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                    <div className="h-4 w-6 rounded bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                    <div className="h-4 w-6 rounded bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                    <div className="h-4 w-8 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
