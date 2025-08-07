import { Card, CardContent } from '@/components/ui/card';

export default function RecordListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="h-full space-y-4 px-2 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <RecordListCardSkeleton key={index} />
      ))}
    </div>
  );
}

function RecordListCardSkeleton() {
  return (
    <Card className="p-0 shadow-sm">
      <CardContent className="my-4 flex flex-col p-4">
        <div className="mb-4 space-y-4">
          {/* 제목 스켈레톤 */}
          <div className="h-8 w-3/4 animate-pulse rounded-md bg-gray-200" />

          {/* 날짜와 운동 개수 스켈레톤 */}
          <div className="mb-3 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* 세트 수와 총 무게 스켈레톤 */}
          <div className="mb-3 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* 메모 스켈레톤 (선택적으로 표시) */}
          <div className="h-16 w-full animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* 버튼 스켈레톤 */}
        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
      </CardContent>
    </Card>
  );
}
