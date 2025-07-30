import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MAX_WEEK } from '@/lib/routines/constant';
import { cn } from '@/lib/utils';

interface WeekPeriodSelectorProps {
  value?: number;
  onChange: (weeks: number) => void;
}

export const WeekPeriodSelector = ({ value, onChange }: WeekPeriodSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>기간 선택</Label>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: MAX_WEEK }).map((_, week) => (
          <Button
            key={week + 1}
            type="button"
            variant={value === week + 1 ? 'default' : 'outline'}
            className={cn(
              'h-12',
              value === week + 1
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'border-gray-200 bg-white text-gray-700'
            )}
            onClick={() => onChange(week + 1)}
          >
            {week + 1}주
          </Button>
        ))}
      </div>
    </div>
  );
};
