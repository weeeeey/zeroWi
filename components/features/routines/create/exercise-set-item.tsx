import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExerciseSetItemProps {
  setIndex: number;
  targetWeight: number;
  targetRest: number;
  onWeightChange: (weight: number) => void;
  onRestChange: (rest: number) => void;
}

export const ExerciseSetItem = ({
  setIndex,
  targetWeight,
  targetRest,
  onWeightChange,
  onRestChange,
}: ExerciseSetItemProps) => {
  return (
    <div className="grid grid-cols-3 items-center gap-3">
      <div className="text-center">
        <Badge variant="secondary">{setIndex + 1}세트</Badge>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">목표 무게 (kg)</Label>
        <Input
          type="number"
          min="0"
          step="0.5"
          value={targetWeight}
          onChange={(e) => onWeightChange(Number.parseFloat(e.target.value) || 0)}
          className="h-8 bg-white text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">휴식 (초)</Label>
        <Input
          type="number"
          min="0"
          step="30"
          value={targetRest}
          onChange={(e) => onRestChange(Number.parseInt(e.target.value) || 0)}
          className="h-8 bg-white text-sm"
        />
      </div>
    </div>
  );
};
