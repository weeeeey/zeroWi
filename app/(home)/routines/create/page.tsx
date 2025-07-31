'use client';

import {
  RoutineBasicInfoStep,
  RoutineExerciseConfigStep,
  RoutineSettingsStep,
} from '@/components/features/routines/create';
import CreateAlertModal from '@/components/features/routines/create/create-alert-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { routineSchema } from '@/lib/routines/zod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function RoutineCreatorPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { handleInit, hasEmptyDays } = useAddExerciseRoutine();
  const [currentStep, setCurrentStep] = useState(1);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

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
        //
        setAlertModalOpen(true);
        form.setFocus('name');
        return;
      }
    }

    if (currentStep === 2) {
      // 빈 운동 일수가 있으면 모달 오픈해버리기
      // const
      const isEmptyDays = hasEmptyDays();
      if (isEmptyDays) {
        setAlertModalOpen(true);
        return;
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

  const moveTop = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    moveTop();
  }, [currentStep]);

  useEffect(() => {
    return () => handleInit('single');
  }, [handleInit]);

  return (
    <div className="container space-y-6">
      {/* Header */}
      <div ref={headerRef} className="mb-6 flex items-center justify-between">
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
            {/* 1단계: 루틴 이름,타입(싱글 or 멀티) */}
            <RoutineBasicInfoStep form={form} />
            {/* 2단계: 루틴 일자별 운동과 각 세트별 셋팅 */}
            <RoutineExerciseConfigStep />
            {/* 3단계: 공유 or 비공유 선택 및 최종 컨펌 */}
            <RoutineSettingsStep form={form} />
          </div>
        </div>
      </form>

      {/* Move UP Button */}
      <button
        aria-label="상단 이동 버튼"
        onClick={moveTop}
        className="fixed bottom-6 left-1/2 z-10 translate-x-[calc(8rem+1px)] -translate-y-full cursor-pointer rounded-full bg-blue-400 p-4 ring-1 ring-indigo-500 ring-offset-2 hover:bg-blue-500"
      >
        <ChevronUp className="size-7 text-white" />
      </button>

      <CreateAlertModal
        isOpen={alertModalOpen}
        currentStage={currentStep}
        onClose={() => setAlertModalOpen(false)}
        moveNextSteop={() => setCurrentStep((p) => p + 1)}
      />
    </div>
  );
}
