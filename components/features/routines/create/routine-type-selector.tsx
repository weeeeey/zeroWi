import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RoutineTypeSelectorProps {
  value: 'single' | 'multi';
  onChange: (type: 'single' | 'multi') => void;
}

export const RoutineTypeSelector = ({ value, onChange }: RoutineTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>루틴 타입</Label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={value === 'single' ? 'default' : 'outline'}
          className={cn(
            'h-16 flex-col space-y-1',
            value === 'single'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              : 'border-gray-200 bg-white text-gray-700'
          )}
          onClick={() => onChange('single')}
        >
          <span className="font-semibold">1일</span>
          <span className="text-xs opacity-80">단일 운동</span>
        </Button>
        <Button
          type="button"
          variant={value === 'multi' ? 'default' : 'outline'}
          className={cn(
            'h-16 flex-col space-y-1',
            value === 'multi'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              : 'border-gray-200 bg-white text-gray-700'
          )}
          onClick={() => {
            onChange('multi');
            setTimeout(() => {
              window.scroll({
                top: 2000,
                behavior: 'smooth',
              });
            }, 200);
          }}
        >
          <span className="font-semibold">주기 운동</span>
          <span className="text-xs opacity-80">분할 운동</span>
        </Button>
      </div>
    </div>
  );
};
