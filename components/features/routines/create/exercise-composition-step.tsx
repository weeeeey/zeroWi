import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModal } from '@/hooks/use-modal';
import type { Exercise, SelectedExercise } from '@/types/routine';

import { ExerciseList } from './exercise-list';
import { WeekDaySelector } from './week-day-selector';

interface ExerciseCompositionStepProps {
  routineType: 'single' | 'multi';
  totalWeeks?: number;
  selectedWeek: number;
  selectedDay: number;
  exercises: Record<string, Record<number, Exercise[]>>;
  onWeekChange: (week: number) => void;
  onDayChange: (day: number) => void;
  onExerciseAdd: (exercise: SelectedExercise) => void;
  onExerciseRemove: (exerciseId: string) => void;
  onExerciseSetUpdate: (
    exerciseId: string,
    setIndex: number,
    field: 'targetWeight' | 'targetRest',
    value: number
  ) => void;
  getCurrentExercises: () => Exercise[];
}

export const ExerciseCompositionStep = ({
  routineType,
  totalWeeks = 1,
  selectedWeek,
  selectedDay,
  exercises,
  onWeekChange,
  onDayChange,
  onExerciseAdd,
  onExerciseRemove,
  onExerciseSetUpdate,
  getCurrentExercises,
}: ExerciseCompositionStepProps) => {
  const { onOpen } = useModal();

  const getTitle = () => {
    return routineType === 'multi' ? `${selectedWeek}주차 ${selectedDay}일차` : '운동 목록';
  };

  return (
    <div className="w-full flex-shrink-0">
      <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">운동 구성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {routineType === 'multi' && (
            <WeekDaySelector
              totalWeeks={totalWeeks}
              selectedWeek={selectedWeek}
              selectedDay={selectedDay}
              onWeekChange={onWeekChange}
              onDayChange={onDayChange}
            />
          )}

          <ExerciseList
            exercises={getCurrentExercises()}
            title={getTitle()}
            onAddExercise={() => onOpen('EXERCISES_INFO')}
            onRemoveExercise={onExerciseRemove}
            onUpdateExerciseSet={onExerciseSetUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
};
