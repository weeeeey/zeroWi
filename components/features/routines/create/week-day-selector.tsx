import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WeekDaySelectorProps {
  totalWeeks: number;
  selectedWeek: number;
  selectedDay: number;
  onWeekChange: (week: number) => void;
  onDayChange: (day: number) => void;
}

export const WeekDaySelector = ({
  totalWeeks,
  selectedWeek,
  selectedDay,
  onWeekChange,
  onDayChange,
}: WeekDaySelectorProps) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-100 p-1">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
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
              onClick={() => onWeekChange(week)}
            >
              {week}주차
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <Button
            key={day}
            type="button"
            size="sm"
            variant={selectedDay === index + 1 ? 'default' : 'outline'}
            className={cn(
              'h-12 flex-col',
              selectedDay === index + 1
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'border-gray-200 bg-white text-gray-700'
            )}
            onClick={() => onDayChange(index + 1)}
          >
            <span className="text-xs">{day}</span>
            <span className="text-xs opacity-60">{index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
