import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EXERCISE_DEVIDES } from '@/lib/routines/constant';
import { cn } from '@/lib/utils';
import { ExerciseDevied } from '@/types/exercise';

interface ExerciseDevideSelectorProps {
  value?: string;
  onChange: (devide: ExerciseDevied) => void;
}

export const ExerciseDevideSelector = ({ value, onChange }: ExerciseDevideSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>분할 선택</Label>
      <div className="grid grid-cols-5 gap-2">
        {EXERCISE_DEVIDES.map((devide) => (
          <Button
            key={devide}
            type="button"
            variant={value === devide ? 'default' : 'outline'}
            className={cn(
              'h-12',
              value === devide
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'border-gray-200 bg-white text-gray-700'
            )}
            onClick={() => onChange(devide)}
          >
            {devide}
          </Button>
        ))}
      </div>
    </div>
  );
};
