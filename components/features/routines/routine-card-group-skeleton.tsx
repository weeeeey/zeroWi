import { Card, CardContent } from '@/components/ui/card';
// shadcn/ui Card 컴포넌트 경로에 맞게 조정하세요.
import { Skeleton } from '@/components/ui/skeleton';

// shadcn/ui Skeleton 컴포넌트 경로에 맞게 조정하세요.

export default function RoutineCardGroupSkeleton() {
  return (
    <div className="space-y-4">
      <RoutineCardSkeleton />
      <RoutineCardSkeleton />
      <RoutineCardSkeleton />
      <RoutineCardSkeleton />
    </div>
  );
}

function RoutineCardSkeleton() {
  return (
    <Card className="h-72 border-none p-0 shadow-sm">
      {/* h-72 높이 반영 */}
      <div className="mt-4 ml-2 inline-block">
        <Skeleton className="h-6 w-20 rounded-full" /> {/* difficulty 뱃지 스켈레톤 */}
      </div>
      <CardContent className="flex flex-col p-4 pt-0">
        <div className="mb-4 space-y-4">
          <div className="mb-2 flex items-start justify-between">
            <Skeleton className="h-8 w-3/4" /> {/* title 스켈레톤 */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* 드롭다운 버튼 스켈레톤 */}
          </div>
          <div className="mb-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Clock 아이콘 스켈레톤 */}
              <Skeleton className="h-4 w-20" /> {/* executeCount 스켈레톤 */}
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* CalendarDays 아이콘 스켈레톤 */}
              <Skeleton className="h-4 w-24" /> {/* latestExecuteDate 스켈레톤 */}
            </div>
          </div>
          {/* description 스켈레톤: h-16 높이 반영, rounded-md, bg-slate-100 스타일 모방 */}
          <Skeleton className="h-16 w-full rounded-md bg-slate-100" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" /> {/* 운동 시작 버튼 스켈레톤 */}
      </CardContent>
    </Card>
  );
}
