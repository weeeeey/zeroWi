'use client';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { weekdayShort } from '@/lib/home/constant';
import { getWeekdayIndex, normalize, weekLabel } from '@/lib/home/utils';
import { cn } from '@/lib/utils';
import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

function HomeDatePicker({
  selected,
  setSelected,
  weekDays,
  onNavigateWeek,
  maxDate,
  profileCreateAt,
  anchorDate,
}: {
  selected: Date;
  setSelected: (date: Date) => void;
  weekDays: Date[];
  onNavigateWeek: (direction: 1 | -1) => void;
  profileCreateAt: Date;
  maxDate: Date;
  anchorDate: Date;
}) {
  const minDate = normalize(profileCreateAt);

  const toggleDay = (day: Date) => {
    if (!isSameDay(day, selected)) {
      setSelected(normalize(day));
    }
  };

  const isNavigationDisabled = (direction: 1 | -1) => {
    const targetWeekStart = startOfWeek(addDays(anchorDate, direction * 7), { weekStartsOn: 1 });
    const boundaryWeekStart = startOfWeek(direction === -1 ? minDate : maxDate, {
      weekStartsOn: 1,
    });

    return direction === -1
      ? targetWeekStart < boundaryWeekStart
      : targetWeekStart > boundaryWeekStart;
  };

  return (
    <div className="bg-card w-full border p-3 shadow-sm" aria-label="주간 일수 선택">
      <div className="flex items-center justify-between gap-2">
        {/* 선택 된 주 라벨들 */}
        <div className="ml-1 flex items-center gap-2 font-medium">
          <CalendarDays className="text-muted-foreground size-5" />
          <span className="text-2xl font-semibold">{weekLabel(weekDays)}</span>
        </div>
        {/* 주 이동 버튼 */}
        <div className="space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek(-1)}
            aria-label="이전 주"
            disabled={isNavigationDisabled(-1)}
            className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek(1)}
            aria-label="다음 주"
            disabled={isNavigationDisabled(1)}
            className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isSelected = isSameDay(selected, day);
          const label = weekdayShort[getWeekdayIndex(day)];
          const isDisabled = day > maxDate || day < minDate;

          return (
            <Toggle
              key={day.toISOString()}
              pressed={isSelected}
              onPressedChange={() => toggleDay(day)}
              aria-pressed={isSelected}
              aria-label={`${format(day, 'yyyy-MM-dd')} ${label} 선택`}
              className={cn(
                'h-10 w-full rounded-md border text-sm font-medium select-none',
                'data-[state=on]:bg-foreground data-[state=on]:text-background cursor-pointer'
              )}
              disabled={isDisabled}
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-muted-foreground text-[10px]">{label}</span>
                <span className="text-xs">{format(day, 'd', { locale: ko })}</span>
              </div>
            </Toggle>
          );
        })}
      </div>
    </div>
  );
}

export default HomeDatePicker;
