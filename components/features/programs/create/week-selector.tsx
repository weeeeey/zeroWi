'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WeekSelectorProps {
  totalWeek: number;
  selectedWeek: number;
  onWeekSelect: (week: number) => void;
}

export function WeekSelector({ totalWeek, selectedWeek, onWeekSelect }: WeekSelectorProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-100 p-1">
        {Array.from({ length: totalWeek }, (_, i) => i + 1).map((week) => (
          <Button
            key={week}
            type="button"
            size="sm"
            variant={selectedWeek === week ? 'default' : 'ghost'}
            className={cn(
              selectedWeek === week
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'text-gray-600'
            )}
            onClick={() => onWeekSelect(week)}
          >
            {week}주차
          </Button>
        ))}
      </div>
    </div>
  );
}
