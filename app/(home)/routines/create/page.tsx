'use client';

import {
  RoutineBasicInfoStep,
  RoutineExerciseConfigStep,
  RoutineSettingsStep,
} from '@/components/features/routines/create';
import CreateAlertModal from '@/components/features/routines/create/create-alert-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/custom-toaster';
import PageLoading from '@/components/ui/page-loading';
import { useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { useModal } from '@/hooks/use-modal';
import { useUser } from '@/hooks/use-user';
import { SEARCHPARAM_ROUTINEID } from '@/lib/routines/constant';
import { routineSchema } from '@/lib/routines/zod-schema';
import { RequestRoutineFormData } from '@/types/routine';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function RoutineCreatorPage() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen } = useModal();

  const { userId } = useUser();
  const { handleInit, hasEmptyDays, routineType, totalDays, selectedExercisesByDay } =
    useAddExerciseRoutine();

  const form = useForm<z.infer<typeof routineSchema>>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      name: '',
      isPublic: false,
      description: '',
      difficulty: undefined,
      exerciseDevide: undefined,
    },
  });

  // 3단계에서 루틴 생성하기 버튼(타입 submit) 클릭시 form submit 실행
  const onSubmit = async (data: z.infer<typeof routineSchema>) => {
    try {
      setIsLoading(true);
      if (!userId) {
        throw new Error('로그인 기록이 없습니다.');
      }
      const requestData: RequestRoutineFormData = {
        ...data,
        authorId: userId,
        routineType,
        totalDays,
        createExerciseInfos: selectedExercisesByDay,
      };

      const res = await fetch('/api/routine', {
        body: JSON.stringify(requestData),
        method: 'POST',
      });

      const parsingResponse = await res.json();
      if (parsingResponse.success) {
        router.push(`/routines?${SEARCHPARAM_ROUTINEID}=${parsingResponse.routineId}`);
        setTimeout(() => {
          onOpen('ROUTINE_DETAIL');
        }, 1000);
      }
    } catch (error) {
      let message = '서버 문제로 인해 잠시 후 다시 시도해주세요.';
      if (error instanceof Error) {
        message = error.message;
      }
      toast('루틴 생성에 실패했습니다.', {
        description: message,
        duration: 5000,
        variant: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const title = form.getValues('name');
      if (!title) {
        setAlertModalOpen(true);
        form.setFocus('name');
        return;
      }
    } else if (currentStep === 2) {
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
      {isLoading && <PageLoading />}
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
          className="flex cursor-pointer items-center space-x-2 bg-blue-400 hover:bg-blue-500 disabled:text-slate-100"
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
