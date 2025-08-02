'use client';

import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/record/util';
import { Minus, Plus } from 'lucide-react';

interface RecordFooterProps {
  isResting: boolean;
  currentRestDuration: number;
  restTime: number;
  totalTime: number;

  endRest: () => void;
  adjustRestTime: (value: number) => void;
}

function RecordFooter({
  currentRestDuration,
  isResting,
  restTime,
  totalTime,
  endRest,
  adjustRestTime,
}: RecordFooterProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
      <div className="mx-auto max-w-(--max-width)">
        {isResting ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-xs text-gray-600">휴식 시간</div>
                <div className="font-mono text-lg font-semibold text-blue-600">
                  {formatTime(restTime)} / {formatTime(currentRestDuration)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustRestTime(-10)}
                  className="p-2"
                >
                  <Minus className="h-4 w-4" />
                  10초
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustRestTime(10)}
                  className="p-2"
                >
                  <Plus className="h-4 w-4" />
                  10초
                </Button>
              </div>
            </div>
            <Button onClick={endRest} variant="default">
              휴식 종료
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-xs text-gray-600">경과 시간</div>
            <div className="font-mono text-lg font-semibold">{formatTime(totalTime)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordFooter;
