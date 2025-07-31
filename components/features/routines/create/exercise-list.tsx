'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface Exercise {
  title: string;
  // 다른 운동 관련 속성들...
}

interface ExerciseListProps {
  exercises: Exercise[];
  currentDay: number;
  routineType: 'single' | 'multi';
  onRemoveExercise: (title: string) => void;
}

export function ExerciseList({
  exercises,
  currentDay,
  routineType,
  onRemoveExercise,
}: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-center text-gray-500">
            {routineType === 'multi'
              ? '운동을 추가하지 않으면 휴식일로 지정됩니다'
              : '운동을 추가해보세요'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <Card key={`${currentDay}-${exercise.title}`} className="border-gray-200 bg-white">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{exercise.title}</h4>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onRemoveExercise(exercise.title)}
                className="text-red-500 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {/* TODO: 운동 별 세트 수정하는 부분 */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
