import { useAddExerciseProgram } from '@/hooks/use-add-exercise-program';
import { type ProgramFormData, programSchema } from '@/lib/programs/zod-schema';
import type { Exercise, SelectedExercise } from '@/types/program';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * 프로그램 생성 흐름을 관리하는 커스텀 훅입니다.
 * 여러 단계에 걸쳐 프로그램 정보와 운동 목록을 입력받고 관리합니다.
 */
export const useProgramCreator = () => {
  const { handleInit } = useAddExerciseProgram();
  const [currentStep, setCurrentStep] = useState(1); // 현재 프로그램 생성 단계
  const [selectedWeek, setSelectedWeek] = useState(1); // 현재 선택된 주차
  const [selectedDay, setSelectedDay] = useState(1); // 현재 선택된 요일
  const [exercises, setExercises] = useState<Record<string, Record<number, Exercise[]>>>({}); // 주차/요일별 운동 목록

  /**
   * React Hook Form을 사용하여 프로그램 폼 데이터를 관리합니다.
   * `programSchema`를 통해 유효성 검사를 수행합니다.
   */
  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: '',
      type: 'single',
      weeks: 1,
      isPublic: false,
      description: '',
      // difficulty와 exerciseDevide는 optional이므로 defaultValues에 없어도 됨
    },
  });

  const watchedType = form.watch('type'); // 폼에서 watch하는 프로그램 타입
  const watchedWeeks = form.watch('weeks'); // 폼에서 watch하는 주차 수

  /**
   * 선택된 운동을 현재 주차/요일의 운동 목록에 추가합니다.
   * @param {SelectedExercise} selectedExercise - 추가할 운동의 정보.
   */
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

  /**
   * 특정 운동을 현재 주차/요일의 운동 목록에서 제거합니다.
   * @param {string} exerciseId - 제거할 운동의 ID.
   */
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

  /**
   * 특정 운동 세트의 값을 업데이트합니다.
   * @param {string} exerciseId - 운동의 ID.
   * @param {number} setIndex - 업데이트할 세트의 인덱스.
   * @param {'targetWeight' | 'targetRest'} field - 업데이트할 필드 이름.
   * @param {number} value - 업데이트할 값.
   */
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

  /**
   * 현재 주차/요일에 해당하는 운동 목록을 가져옵니다.
   * @returns {Exercise[]} 현재 선택된 주차/요일의 운동 목록.
   */
  const getCurrentExercises = () => {
    const key = watchedType === 'single' ? 'single' : `week-${selectedWeek}`;
    const dayKey = watchedType === 'single' ? 1 : selectedDay;
    return exercises[key]?.[dayKey] || [];
  };

  /**
   * 다음 단계로 이동합니다.
   */
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

  /**
   * 이전 단계로 이동합니다.
   */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * 프로그램 폼 데이터를 최종 제출합니다.
   * @param {ProgramFormData} data - 제출할 프로그램 폼 데이터.
   */
  const onSubmit = (data: ProgramFormData) => {
    // console.log('Program created:', { ...data, exercises });
    // 실제 API 호출
  };

  // 단계 이동 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // 컴포넌트 언마운트 시 전역 상태 초기화
  useEffect(() => {
    return () => handleInit(watchedType); // watchedType을 인자로 전달
  }, [handleInit, watchedType]);

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