'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ProgramType as CreateProgramType,
  useAddExerciseProgram,
} from '@/hooks/use-add-exercise-program';
import { EXERCISE_DEVIDES, MAX_DAYS } from '@/lib/programs/constant';
import { programSchema } from '@/lib/programs/zod-schema';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface ProgramBasicInfoStepProps {
  form: UseFormReturn<z.infer<typeof programSchema>>;
}

export default function ProgramBasicInfoStep({ form }: ProgramBasicInfoStepProps) {
  const selectWeekContainerRef = useRef<HTMLDivElement>(null);
  const { programType, totalDays, handleInit, setProgramConfig } = useAddExerciseProgram();

  const totalWeek = Math.ceil(totalDays / 7);
  const watchedDevide = form.watch('exerciseDevide');

  const selectProgramType = (type: CreateProgramType) => {
    if (type === programType) return;

    const isMulti = type === 'multi';

    form.setValue('exerciseDevide', isMulti ? '무분할' : undefined);
    handleInit(type);

    if (isMulti) {
      setProgramConfig('multi', 1);
      // 멀티 생성 시 프로그램 선택으로 포커싱
      setTimeout(() => {
        if (selectWeekContainerRef.current) {
          selectWeekContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    } else {
      setProgramConfig('single');
    }
  };

  const handleTotalWeek = (week: number) => {
    setProgramConfig('multi', week);
  };

  return (
    <div className="w-full flex-shrink-0">
      <Card className="mb-6 border-0 bg-white/80 pb-14 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">프로그램 기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">프로그램 이름</Label>
            <Input
              id="name"
              placeholder="예: 상체 집중 프로그램"
              {...form.register('name')}
              className="border-gray-200 bg-white"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>프로그램 타입</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={programType === 'single' ? 'default' : 'outline'}
                className={cn(
                  'h-16 flex-col space-y-1',
                  programType === 'single'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700'
                )}
                onClick={() => selectProgramType('single')}
              >
                <span className="font-semibold">1일</span>
                <span className="text-xs opacity-80">단일 운동</span>
              </Button>
              <Button
                type="button"
                variant={programType === 'multi' ? 'default' : 'outline'}
                className={cn(
                  'h-16 flex-col space-y-1',
                  programType === 'multi'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700'
                )}
                onClick={() => selectProgramType('multi')}
              >
                <span className="font-semibold">주기 운동</span>
                <span className="text-xs opacity-80">분할 운동</span>
              </Button>
            </div>
          </div>

          <div
            className={`origin-top space-y-3 transition-all ${
              programType === 'multi' ? 'scale-y-full h-full' : 'h-0 scale-y-0'
            }`}
          >
            <Label>기간 선택</Label>
            <div ref={selectWeekContainerRef} className="grid grid-cols-4 gap-2">
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
