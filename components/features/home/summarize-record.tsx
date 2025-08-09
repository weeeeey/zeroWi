import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ChevronRight, Clock } from 'lucide-react';
import { memo } from 'react';

function SummarizeRecord({ profileId, day }: { profileId: string; day: Date }) {
  return (
    <div className="rounded-none border-none px-0 py-2">
      <div className="space-y-4 border-none px-0">
        <div className="px-4">
          {Array.from({ length: 3 }).map((rec, id) => (
            <div key={id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-900">루틴 이름</span>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700"
                  >
                    10개 운동
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>(운동 시간) 분</span>
                  <span aria-hidden="true">·</span>
                  <span>{format(new Date(), 'yy-mm-dd')}</span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                aria-label="기록 상세 보기"
              >
                상세 보기
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(SummarizeRecord);
