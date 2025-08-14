'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useModal } from '@/hooks/use-modal';
import { RecordWithTotalWeight } from '@/types/record';
import { format } from 'date-fns';
import { CalendarDays, Clock, Target, Weight } from 'lucide-react';

interface RecordListCardProps {
  record: RecordWithTotalWeight;
}

export default function RecordListCard({ record }: RecordListCardProps) {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen('RECORD_DETAIL');

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('recordId', record.id);

    // 페이지 새로고침 없이 URL만 변경
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <Card className="p-0 shadow-sm">
      <CardContent className="my-4 flex flex-col p-4">
        <div className="mb-4 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900">{record.program.title}</h3>

          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {format(record.createdAt, 'yy.MM.dd')}
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {record.exerciseCount}개 운동
            </div>
          </div>

          <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />총 {record.totalSets}세트
            </div>
            <div className="flex items-center gap-1">
              <Weight className="h-4 w-4" />
              {isNaN(record.totalWeight) ? '0kg' : `${record.totalWeight.toLocaleString()}kg`}
            </div>
          </div>

          {record.memo && (
            <p className="h-16 truncate rounded-md bg-slate-100 px-2 py-1 text-sm text-wrap text-slate-600">
              {record.memo}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="cursor-pointer rounded-xl bg-blue-500 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-600"
        >
          기록 상세보기
        </button>
      </CardContent>
    </Card>
  );
}
