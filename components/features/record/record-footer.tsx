'use client';

import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/record/util';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface RecordFooterProps {
  isResting: boolean;
  restTime: number;
  totalTime: number;

  adjustRestTime: (value: number) => void;
}

function RecordFooter({ isResting, restTime, totalTime, adjustRestTime }: RecordFooterProps) {
  return (
    <footer className="fixed bottom-0 mx-auto w-(--max-width) border-t bg-white px-1 py-4">
      <div className="flex items-center justify-between">
        {/* 휴식 또는 운동 경과 시간 */}
        <div className="text-center">
          <div className="text-xs text-gray-600">{isResting ? '남은 휴식' : '경과 시간'}</div>
          <div className="font-mono text-lg font-semibold">
            {formatTime(isResting ? restTime : totalTime)}
          </div>
        </div>

        {/* 휴식 시간 조정 */}

        <div className={cn('flex items-center gap-3', isResting ? 'scale-100' : 'scale-0')}>
          <Button variant="outline" size="sm" onClick={() => adjustRestTime(-10)} className="p-2">
            <Minus className="size-4" />
            10초
          </Button>
          <Button variant="outline" size="sm" onClick={() => adjustRestTime(10)} className="p-2">
            <Plus className="size-4" />
            10초
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default RecordFooter;
