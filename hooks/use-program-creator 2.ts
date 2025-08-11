import { useAddExerciseProgram } from '@/hooks/use-add-exercise-program';
import { type ProgramFormData, programSchema } from '@/lib/programs/zod-schema';
import type { Exercise, SelectedExercise } from '@/types/program';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useProgramCreator = () => {
  const { handleInit } = useAddExerciseProgram();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [exercises, setExercises] = useState<Record<string, Record<number, Exercise[]>>>({});

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: '',
      type: 'single',
      weeks: 1,
      isPublic: false,
      description: '',
    },
  });

  const watchedType = form.watch('type');
  const watchedWeeks = form.watch('weeks');

  const addExercise = (selectedExercise: SelectedExercise) => {
    const key = watchedType === 'single' ? 'single' : `week-${selectedWeek}`;
    const dayKey = watchedType === 'single' ? 1 : selectedDay;

    const newExercise: Exercise = {
      id: `${selectedExercise.id}-${Date.now()}`,
      name: selectedExercise.name,
      sets: [
        { targetWeight: 0, targetRest: 60 },
        { targetWeight: 0, targetRest: 60 },
        { targetWeight: 0, targetRest: 60 },
      ],
    };

    setExercises((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [dayKey]: [...(prev[key]?.[dayKey] || []), newExercise],
      },
    }));
  };

  const removeExercise = (exerciseId: string) => {
    const key = watchedType === 'single' ? 'single' : `week-${selectedWeek}`;
    const dayKey = watchedType === 'single' ? 1 : selectedDay;

    setExercises((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [dayKey]: prev[key]?.[dayKey]?.filter((ex) => ex.id !== exerciseId) || [],
      },
    }));
  };

  const updateExerciseSet = (
    exerciseId: string,
    setIndex: number,
    field: 'targetWeight' | 'targetRest',
    value: number
  ) => {
    const key = watchedType === 'single' ? 'single' : `week-${selectedWeek}`;
    const dayKey = watchedType === 'single' ? 1 : selectedDay;

    setExercises((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [dayKey]:
          prev[key]?.[dayKey]?.map((ex) =>
            ex.id === exerciseId
              ? {
                  ...ex,
                  sets: ex.sets.map((set, idx) =>
                    idx === setIndex ? { ...set, [field]: value } : set
                  ),
                }
              : ex
          ) || [],
      },
    }));
  };

  const getCurrentExercises = () => {
    const key = watchedType === 'single' ? 'single' : `week-${selectedWeek}`;
    const dayKey = watchedType === 'single' ? 1 : selectedDay;
    return exercises[key]?.[dayKey] || [];
  };

  // 다음 단계 이동 처리
  const nextStep = () => {
    if (currentStep === 1) {
      const title = form.getValues('name');
      if (!title) {
        // 검증 로직 필요시 추가
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  // 다음 단계 이동 처리
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  // 최종 제출
  const onSubmit = (data: ProgramFormData) => {
    // console.log('Program created:', { ...data, exercises });
    // 실제 API 호출
  };

  // 단계 이동시마다 스크롤 탑으로
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // 언마운트시 전역 관리 초기화
  useEffect(() => {
    return () => handleInit();
  }, [handleInit]);

  return {
    form,
    currentStep,
    selectedWeek,
    selectedDay,
    exercises,
    watchedType,
    watchedWeeks,
    setSelectedWeek,
    setSelectedDay,
    addExercise,
    removeExercise,
    updateExerciseSet,
    getCurrentExercises,
    nextStep,
    prevStep,
    onSubmit,
  };
};
