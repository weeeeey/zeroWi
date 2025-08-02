'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RecordedExercise } from '@/types/record';
import { Check } from 'lucide-react';

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
    <div className="h-full space-y-4 p-4 pb-24">
      {exercises.map((exercise, exerciseIndex) => (
        <Card
          key={exerciseIndex}
          className={`${exercise.isCompleted ? 'border-green-200 bg-green-50' : ''}`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>{exercise.title}</span>
              {exercise.isCompleted && (
                <Badge variant="default" className="bg-green-600">
                  <Check className="mr-1 h-3 w-3" />
                  완료
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exercise.sets.map((set, setIndex) => (
              <div
                key={setIndex}
                className={`rounded-lg border p-3 ${set.isCompleted ? 'border-green-200 bg-green-50' : 'bg-gray-50'}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">세트 {set.setNumber}</span>
                  <Badge
                    variant={set.isCompleted ? 'default' : 'outline'}
                    className={set.isCompleted ? 'bg-green-600' : ''}
                  >
                    {set.isCompleted ? '완료' : '대기'}
                  </Badge>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      무게 (kg) - 목표: {set.targetWeight}kg
                    </label>
                    <Input
                      type="number"
                      value={set.actualWeight || ''}
                      onChange={(e) =>
                        updateSetRecord(exerciseIndex, setIndex, 'actualWeight', e.target.value)
                      }
                      disabled={set.isCompleted}
                      className="text-center"
                      placeholder={set.targetWeight?.toString()}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      횟수 - 목표: {set.targetReps}회
                    </label>
                    <Input
                      value={set.actualReps || ''}
                      onChange={(e) =>
                        updateSetRecord(exerciseIndex, setIndex, 'actualReps', e.target.value)
                      }
                      disabled={set.isCompleted}
                      className="text-center"
                      placeholder={set.targetReps}
                    />
                  </div>
                </div>

                {!set.isCompleted && (
                  <Button
                    onClick={() => completeSet(exerciseIndex, setIndex)}
                    className="w-full"
                    disabled={!set.actualWeight || !set.actualReps}
                  >
                    세트 완료
                  </Button>
                )}

                <div className="mt-2 text-center text-xs text-gray-500">
                  휴식 시간: {Math.floor(set.restSeconds / 60)}분 {set.restSeconds % 60}초
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RecordMain;
