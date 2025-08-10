'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreateProgramExercise,
  UpdateExerciseKey,
  useAddExerciseProgram,
} from '@/hooks/use-add-exercise-program';
import { MAX_EXERCISE_SET_COUNT } from '@/lib/programs/constant';
import { ArrowRightLeft, Trash2, X } from 'lucide-react';
import { MouseEvent } from 'react';

interface ExerciseCreateCardProps {
  exercise: CreateProgramExercise;
}

function ExerciseCreateCard({ exercise }: ExerciseCreateCardProps) {
  const {
    currentDay,
    handleRemoveExercise,
    addExerciseSet,
    removeExerciseSet,
    updateExerciseSetValue,
  } = useAddExerciseProgram();

  const handleChangeValue = (key: UpdateExerciseKey, setId: number, value: string) => {
    updateExerciseSetValue(exercise.title, setId, key, value);
  };

  const handleAddSet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (exercise.sets.length >= MAX_EXERCISE_SET_COUNT) {
      window.alert(`각 운동 별 최대 세트 수는 ${MAX_EXERCISE_SET_COUNT}개 입니다`);
      return;
    }
    addExerciseSet(exercise.title);
  };

  return (
    <Card className="overflow-hidden border-gray-200 bg-white p-0">
      <CardContent className="px-1 py-3">
        {/* 카드 헤더 */}
        <header className="mt-1 mb-3 flex items-end justify-between pr-2 pl-3">
          <h4 className="text-2xl font-semibold text-gray-900">{exercise.title}</h4>
          <div className="space-x-2">
            <button
              aria-label="운동 변경 버튼"
              onClick={() => window.alert('운동 변경 버튼 로직 추가!!')}
              className="mb-1 text-slate-700"
            >
              <ArrowRightLeft className="size-5" />
            </button>
            <button
              onClick={() => handleRemoveExercise(exercise.title)}
              className="mb-1 text-red-500 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="size-5" />
            </button>
          </div>
        </header>

        {/* TODO: 운동 별 세트 수정하는 부분 */}
        <div className="space-y-3">
          {exercise.sets.map((set, index) => (
            <div
              key={`${currentDay}-${exercise.title}-${set.setNumber}`}
              className="flex items-end gap-2"
            >
              <div className="text-primary-foreground mb-1 flex size-6 items-center justify-center rounded-full bg-slate-400 text-xs font-medium">
                {index + 1}
              </div>

              <div className="grid flex-1 grid-cols-2 gap-2">
                {/* 중량 업데이트 */}
                <div className="space-y-1">
                  <Label
                    htmlFor={`weight-${set.setNumber}`}
                    className="text-muted-foreground text-xs"
                  >
                    목표 중량 (kg)
                  </Label>
                  <Input
                    id={`weight-${set.setNumber}`}
                    type="number"
                    value={set.targetWeight}
                    onChange={(e) =>
                      handleChangeValue('targetWeight', set.setNumber, e.target.value)
                    }
                    placeholder="0"
                    className="h-8"
                  />
                </div>

                {/* 휴식시간 업데이트 */}
                <div className="space-y-1">
                  <Label
                    htmlFor={`rest-${set.setNumber}`}
                    className="text-muted-foreground text-xs"
                  >
                    휴식시간 (초)
                  </Label>
                  <Input
                    id={`rest-${set.setNumber}`}
                    type="number"
                    value={set.restSeconds}
                    onChange={(e) =>
                      handleChangeValue('restSeconds', set.setNumber, e.target.value)
                    }
                    placeholder="120"
                    className="h-8"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExerciseSet(exercise.title, set.setNumber)}
                className="text-red-500 ring-1 ring-red-300 hover:text-red-700 disabled:text-slate-100"
                disabled={exercise.sets.length <= 1}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleAddSet}
          className="mt-4 w-full border-dashed bg-slate-300"
        >
          세트 추가
        </Button>
      </CardContent>
    </Card>
  );
}

export default ExerciseCreateCard;
