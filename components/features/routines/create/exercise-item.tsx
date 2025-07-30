import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Exercise } from '@/types/routine';
import { Trash2 } from 'lucide-react';

import { ExerciseSetItem } from './exercise-set-item';

interface ExerciseItemProps {
  exercise: Exercise;
  onRemove: () => void;
  onSetUpdate: (setIndex: number, field: 'targetWeight' | 'targetRest', value: number) => void;
}

export const ExerciseItem = ({ exercise, onRemove, onSetUpdate }: ExerciseItemProps) => {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {exercise.sets.map((set, setIndex) => (
            <ExerciseSetItem
              key={setIndex}
              setIndex={setIndex}
              targetWeight={set.targetWeight}
              targetRest={set.targetRest}
              onWeightChange={(weight) => onSetUpdate(setIndex, 'targetWeight', weight)}
              onRestChange={(rest) => onSetUpdate(setIndex, 'targetRest', rest)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
