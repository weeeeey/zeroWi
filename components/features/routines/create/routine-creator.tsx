'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { routineSchema } from '@/lib/routines/zod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { RoutineBasicInfoStep } from './basic-info-step';
import { RoutineExerciseConfigStep } from './exercise-config-step';
import { RoutineSettingsStep } from './settings-step';

export default function RoutineCreator() {
  const { handleInit } = useAddExerciseRoutine();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof routineSchema>>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      name: '',
      isPublic: false,
      description: '',
    },
  });

  const onSubmit = (data: z.infer<typeof routineSchema>) => {
    // TODO: 실제 API 호출
    console.log('Routine created:', data);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const title = form.getValues('name');
      if (!title) {
        // TODO: 유효성 검사
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    return () => handleInit('single');
  }, [handleInit]);

  return (
    <div className="container space-y-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">루틴 생성</h1>
        <Badge variant="outline" className="bg-white">
          {currentStep}/3 단계
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-white">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mb-2 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex cursor-pointer items-center space-x-2 border-gray-200 bg-white disabled:text-slate-300"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>이전</span>
        </Button>

        <Button
          type="button"
          onClick={nextStep}
          disabled={currentStep === 3}
          className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 disabled:text-slate-300"
        >
          <span>다음</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Steps Container */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
          >
            <RoutineBasicInfoStep form={form} />
            <RoutineExerciseConfigStep />
            <RoutineSettingsStep form={form} />
          </div>
        </div>
      </form>
    </div>
  );
}
