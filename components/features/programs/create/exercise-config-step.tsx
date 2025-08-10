'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddExerciseProgram } from '@/hooks/use-add-exercise-program';
import { useEffect, useState } from 'react';

import { DaySelector } from './day-selector';
import { ExerciseList } from './exercise-list';
import { WeekSelector } from './week-selector';

export default function ProgramExerciseConfigStep() {
  const { programType, totalDays, setCurrentDay } = useAddExerciseProgram();

  const totalWeek = Math.ceil(totalDays / 7);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

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
        <CardContent className="space-y-6 px-0">
          {/* 멀티인 경우 주&일 선택 */}
          {programType === 'multi' && (
            <div className="space-y-4 px-4">
              <WeekSelector
                totalWeek={totalWeek}
                selectedWeek={selectedWeek}
                onWeekSelect={setSelectedWeek}
              />
              <DaySelector selectedDay={selectedDay} onDaySelect={setSelectedDay} />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="mx-4 text-lg font-semibold text-gray-900">
              {programType === 'multi' ? `${selectedWeek}주차 ${selectedDay}일차` : '운동 목록'}
            </h3>

            {/* 현재 일 수 운동 리스트 */}
            <ExerciseList />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
