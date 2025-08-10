'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useAddExerciseProgram } from '@/hooks/use-add-exercise-program';

import ExerciseCreateCard from './exercise-create-card';
import OpenExerciseInfoButton from './open-exercise-info-button';

export function ExerciseList() {
  const { currentDay, programType, getCurrentDayExercises } = useAddExerciseProgram();
  const exercises = getCurrentDayExercises();

  if (exercises.length === 0) {
    return (
      <Card className="mx-4 border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex flex-col items-center justify-center gap-y-8 py-8">
          <p className="text-center text-gray-500">
            {programType === 'multi'
              ? '운동을 추가하지 않으면 휴식일로 지정됩니다'
              : '운동을 추가해보세요'}
          </p>
          <div className="h-12 w-72">
            <OpenExerciseInfoButton iconSize="size-6" className="text-xl font-semibold" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-2 space-y-4">
      {exercises.map((exercise) => (
        <ExerciseCreateCard key={`${currentDay}-${exercise.title}`} exercise={exercise} />
      ))}
      <OpenExerciseInfoButton iconSize="size-6" className="py-2 text-xl font-semibold" />
    </div>
  );
}
