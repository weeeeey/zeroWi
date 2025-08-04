'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatTimeInHourAndMinute } from '@/lib/record/util';
import { Clock, X } from 'lucide-react';

import { memo } from 'react';

interface RecordHeaderProps {
  totalTime: number;
  remainingExercises: number;

  endRecord: () => void;
}

function RecordHeader({ endRecord, remainingExercises, totalTime }: RecordHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-blue-600" />
            <span className="font-mono text-lg font-semibold">
              {formatTimeInHourAndMinute(totalTime)}
            </span>
          </div>
          <Badge variant="secondary" className="text-sm">
            남은 운동: {remainingExercises}개
          </Badge>
        </div>
        <Button
          variant="destructive"
          size="sm"

          onClick={endRecord}
          className="flex items-center gap-2"
        >
          <X className="size-4" />
          종료
        </Button>
      </div>
    </header>
  );
}


export default memo(RecordHeader);
