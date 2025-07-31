'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { useModal } from '@/hooks/use-modal';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DaySelector } from './day-selector';
import { ExerciseList } from './exercise-list';
import { WeekSelector } from './week-selector';

export default function RoutineExerciseConfigStep() {
  const { onOpen } = useModal();
  const {
    routineType,
    currentDay,
    totalDays,
    setCurrentDay,
    getCurrentDayExercises,
    handleRemoveExercise,
  } = useAddExerciseRoutine();

  const totalWeek = Math.ceil(totalDays / 7);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

  const openExerciseInfoModalForSelectedDay = () => {
    onOpen('EXERCISES_INFO');
  };

  useEffect(() => {
    const totalDay = (selectedWeek - 1) * 7 + selectedDay;
    setCurrentDay(totalDay);
  }, [selectedDay, selectedWeek, setCurrentDay]);

  return (
    <div className="w-full flex-shrink-0">
      <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">운동 구성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {routineType === 'multi' && (
            <div className="space-y-4">
              <WeekSelector
                totalWeek={totalWeek}
                selectedWeek={selectedWeek}
                onWeekSelect={setSelectedWeek}
              />
              <DaySelector selectedDay={selectedDay} onDaySelect={setSelectedDay} />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {routineType === 'multi' ? `${selectedWeek}주차 ${selectedDay}일차` : '운동 목록'}
              </h3>
              <Button
                type="button"
                onClick={openExerciseInfoModalForSelectedDay}
                className="bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                <Plus className="mr-1 h-4 w-4" />
                운동 추가
              </Button>
            </div>

            <ExerciseList
              exercises={getCurrentDayExercises()}
              currentDay={currentDay}
              routineType={routineType}
              onRemoveExercise={handleRemoveExercise}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
