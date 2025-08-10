'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DaySelectorProps {
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

export function DaySelector({ selectedDay, onDaySelect }: DaySelectorProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <Button
          key={day}
          type="button"
          size="sm"
          variant={selectedDay === index + 1 ? 'default' : 'outline'}
          className={cn(
            'py-5',
            selectedDay === index + 1
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              : 'border-gray-200 bg-white text-gray-700'
          )}
          onClick={() => onDaySelect(index + 1)}
        >
          <span className="text-xs">{day}</span>
        </Button>
      ))}
    </div>
  );
}
