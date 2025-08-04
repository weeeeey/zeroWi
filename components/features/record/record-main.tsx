'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RecordedExercise } from '@/types/record';
import { Check, CheckCheck } from 'lucide-react';

interface RecordMainProps {
  exercises: RecordedExercise[];
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  updateSetRecord: (
    exerciseIndex: number,
    setIndex: number,
    field: 'actualWeight' | 'actualReps',
    value: string
  ) => void;
}

function RecordMain({ exercises, updateSetRecord, completeSet }: RecordMainProps) {
  return (
    <div className="h-full pb-20">
      {exercises.map((exercise, exerciseIndex) => (
        <Card
          key={exerciseIndex}
          className={`space-y-0 rounded-none border-none p-0 ${exercise.isCompleted ? 'bg-green-300 bg-gradient-to-br from-green-500 to-green-300 text-white' : ''}`}
        >
          <CardContent className="px-2 pb-2">
            {/* 0. 헤더 */}
            <header className="flex items-center justify-between px-3 py-2">
              <h3 className="text-2xl font-bold">{exercise.title}</h3>
              {/* 세트 모두 완료 버튼 */}
              <button className={`rounded-full bg-blue-500 p-2 text-white`}>
                <CheckCheck className="size-6" />
              </button>
            </header>

            {/* 세트 컨텐츠 */}
            {exercise.sets.map((set, setIndex) => (
              <div
                key={setIndex}
                className={`relative mb-2 flex items-end gap-4 rounded-lg border p-3 transition-colors ${set.isCompleted ? 'border-green-100 bg-green-50' : 'border-gray-200 bg-white'}`}
              >
                {/* 1. 세트 번호 */}

                <div
                  className={cn(
                    'absolute top-0 left-2 -translate-y-1/2 rounded-md bg-white px-2 text-slate-500',
                    set.isCompleted && 'bg-green-200 text-blue-500'
                  )}
                >
                  <h5 className={cn('text-sm font-medium')}>Set {setIndex + 1}</h5>
                </div>

                {/* 2. 무게 및 횟수 입력 필드 */}
                <div className="grid flex-1 grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">무게 (kg)</label>
                    <Input
                      type="number"
                      value={set.actualWeight || ''}
                      onChange={(e) =>
                        updateSetRecord(exerciseIndex, setIndex, 'actualWeight', e.target.value)
                      }
                      // className="text-center"
                      placeholder={set.targetWeight?.toString() || '0'}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">횟수</label>
                    <Input
                      type="number"
                      value={set.actualReps}
                      onChange={(e) =>
                        updateSetRecord(exerciseIndex, setIndex, 'actualReps', e.target.value)
                      }
                      // className="text-center"
                      placeholder={set.targetReps || '0'}
                    />
                  </div>
                </div>

                {/* 3. 완료 버튼 또는 완료 뱃지 */}

                <button
                  onClick={() => completeSet(exerciseIndex, setIndex)}
                  className={`cursor-pointer rounded-full bg-slate-300 p-2 text-white`}
                >
                  <Check className="size-6" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RecordMain;
