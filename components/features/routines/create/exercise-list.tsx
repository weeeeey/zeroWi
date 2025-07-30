import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Exercise } from '@/types/routine';
import { Plus } from 'lucide-react';

import { ExerciseItem } from './exercise-item';

interface ExerciseListProps {
  exercises: Exercise[];
  title: string;
  onAddExercise: () => void;
  onRemoveExercise: (exerciseId: string) => void;
  onUpdateExerciseSet: (
    exerciseId: string,
    setIndex: number,
    field: 'targetWeight' | 'targetRest',
    value: number
  ) => void;
}

export const ExerciseList = ({
  exercises,
  title,
  onAddExercise,
  onRemoveExercise,
  onUpdateExerciseSet,
}: ExerciseListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button
          type="button"
          onClick={onAddExercise}
          className="bg-gradient-to-r from-blue-500 to-indigo-600"
        >
          <Plus className="mr-1 h-4 w-4" />
          운동 추가
        </Button>
      </div>

      {exercises.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-center text-gray-500">운동을 추가해보세요</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onRemove={() => onRemoveExercise(exercise.id)}
              onSetUpdate={(setIndex, field, value) =>
                onUpdateExerciseSet(exercise.id, setIndex, field, value)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
