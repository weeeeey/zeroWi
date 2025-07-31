'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RoutineType as CreateRoutineType,
  useAddExerciseRoutine,
} from '@/hooks/use-add-exercise-routine';
import { EXERCISE_DEVIDES, MAX_DAYS } from '@/lib/routines/constant';
import { routineSchema } from '@/lib/routines/zod-schema';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface RoutineBasicInfoStepProps {
  form: UseFormReturn<z.infer<typeof routineSchema>>;
}

export default function RoutineBasicInfoStep({ form }: RoutineBasicInfoStepProps) {
  const { routineType, totalDays, handleInit, setRoutineConfig } = useAddExerciseRoutine();

  const totalWeek = Math.ceil(totalDays / 7);
  const watchedDevide = form.watch('exerciseDevide');

  const selectRoutineType = (type: CreateRoutineType) => {
    if (type === routineType) return;

    const isMulti = type === 'multi';

    form.setValue('exerciseDevide', isMulti ? '무분할' : undefined);
    handleInit(type);

    if (isMulti) {
      setRoutineConfig('multi', 1);
      setTimeout(() => {
        window.scroll({ top: 20000, behavior: 'smooth' });
      }, 200);
    } else {
      setRoutineConfig('single');
    }
  };

  const handleTotalWeek = (week: number) => {
    setRoutineConfig('multi', week);
  };

  return (
    <div className="w-full flex-shrink-0">
      <Card className="mb-6 border-0 bg-white/80 pb-14 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">루틴 기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">루틴 이름</Label>
            <Input
              id="name"
              placeholder="예: 상체 집중 루틴"
              {...form.register('name')}
              className="border-gray-200 bg-white"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>루틴 타입</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={routineType === 'single' ? 'default' : 'outline'}
                className={cn(
                  'h-16 flex-col space-y-1',
                  routineType === 'single'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700'
                )}
                onClick={() => selectRoutineType('single')}
              >
                <span className="font-semibold">1일</span>
                <span className="text-xs opacity-80">단일 운동</span>
              </Button>
              <Button
                type="button"
                variant={routineType === 'multi' ? 'default' : 'outline'}
                className={cn(
                  'h-16 flex-col space-y-1',
                  routineType === 'multi'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700'
                )}
                onClick={() => selectRoutineType('multi')}
              >
                <span className="font-semibold">주기 운동</span>
                <span className="text-xs opacity-80">분할 운동</span>
              </Button>
            </div>
          </div>

          <div
            className={`origin-top space-y-3 transition-all ${
              routineType === 'multi' ? 'scale-y-full h-full' : 'h-0 scale-y-0'
            }`}
          >
            <Label>기간 선택</Label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: Math.floor(MAX_DAYS / 7) }).map((_, weekIdx) => (
                <Button
                  key={`${weekIdx + 1}-week`}
                  type="button"
                  variant={totalWeek === weekIdx + 1 ? 'default' : 'outline'}
                  className={cn(
                    'h-12',
                    totalWeek === weekIdx + 1
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'border-gray-200 bg-white text-gray-700'
                  )}
                  onClick={() => handleTotalWeek(weekIdx + 1)}
                >
                  {weekIdx + 1}주
                </Button>
              ))}
            </div>
            <Label>분할 선택</Label>
            <div className="grid grid-cols-5 gap-2">
              {EXERCISE_DEVIDES.map((devide) => (
                <Button
                  key={devide}
                  type="button"
                  variant={watchedDevide === devide ? 'default' : 'outline'}
                  className={cn(
                    'h-12',
                    watchedDevide === devide
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'border-gray-200 bg-white text-gray-700'
                  )}
                  onClick={() => form.setValue('exerciseDevide', devide)}
                >
                  {devide}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
