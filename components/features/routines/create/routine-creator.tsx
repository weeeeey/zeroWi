'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { useModal } from '@/hooks/use-modal';
import { EXERCISE_DEVIDES, MAX_DAYS } from '@/lib/routines/constant';
import { CreateRoutineType, routineSchema } from '@/lib/routines/zod-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function RoutineCreator() {
  const { onOpen } = useModal();

  const {
    currentDay,
    routineType,
    totalDays,
    selectedExercisesByDay,
    handleInit,
    setCurrentDay,
    getCurrentDayExercises,
    setRoutineConfig,
    handleRemoveExercise,
  } = useAddExerciseRoutine();

  const totalWeek = Math.ceil(totalDays / 7);

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

  const form = useForm<z.infer<typeof routineSchema>>({
    resolver: zodResolver(routineSchema),
    defaultValues: {
      name: '',
      isPublic: false,
      description: '',
    },
  });

  const watchedDevide = form.watch('exerciseDevide');

  /** 1단계 함수 */

  // 루틴 타입 선택
  const selectRoutineType = (type: CreateRoutineType) => {
    if (type === routineType) return;

    const isMulti = type === 'multi';

    // 폼 상태 초기화
    form.setValue('exerciseDevide', isMulti ? '무분할' : undefined);

    // 상태 초기화
    handleInit(type);
    setSelectedWeek(1);
    setSelectedDay(1);

    // 루틴 설정 상태 초기화
    if (isMulti) {
      setRoutineConfig('multi', 1); // 1주차
      setTimeout(() => {
        window.scroll({ top: 20000, behavior: 'smooth' });
      }, 200);
    } else {
      setRoutineConfig('single');
    }
  };

  // 전체 일수 선택 (1단계에서 멀티 타입을 선택했을 경우)
  const handleTotalWeek = (week: number) => {
    setRoutineConfig('multi', week);
  };

  /** 2단계 함수 */

  // 선택한 일에 운동을 추가하기 위한 함수
  const openExerciseInfoModalForSelectedDay = () => {
    onOpen('EXERCISES_INFO');
  };

  // 요일과 주 변화시 일수 파싱
  useEffect(() => {
    const totalDay = (selectedWeek - 1) * 7 + selectedDay;
    setCurrentDay(totalDay);
  }, [selectedDay, selectedWeek, setCurrentDay]);

  /**
   *
   * TODO
   *
   */

  const onSubmit = (data: z.infer<typeof routineSchema>) => {
    // console.log('Routine created:', { ...data, exercises });
    // 실제 API 호출
  };

  /** 버튼 이동 함수와 단계 이동시 스크롤 탑 찍기 */
  const nextStep = () => {
    if (currentStep === 1) {
      const title = form.getValues('name');
      if (!title) {
        // window.alert('루틴 이름을 입력해주세요.');
        // form.setFocus('name');
        // return;
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
            {/* Step 1 */}
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
                    className={`origin-top space-y-3 transition-all ${routineType === 'multi' ? 'scale-y-full h-full' : 'h-0 scale-y-0'}`}
                  >
                    <Label>기간 선택</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: Math.floor(MAX_DAYS / 7) }).map((_, weekIdx) => (
                        <Button
                          key={`${weekIdx + 1}-week 선택 버튼`}
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

            {/* Step 2 */}
            <div className="w-full flex-shrink-0">
              <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900">운동 구성</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {routineType === 'multi' && (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-100 p-1">
                          {Array.from({ length: totalWeek }, (_, i) => i + 1).map((week) => (
                            <Button
                              key={week}
                              type="button"
                              size="sm"
                              variant={selectedWeek === week ? 'default' : 'ghost'}
                              className={cn(
                                selectedWeek === week
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                  : 'text-gray-600'
                              )}
                              onClick={() => setSelectedWeek(week)}
                            >
                              {week}주차
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                          <Button
                            key={day}
                            type="button"
                            size="sm"
                            variant={selectedDay === index + 1 ? 'default' : 'outline'}
                            className={cn(
                              'h-12 flex-col',
                              selectedDay === index + 1
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            )}
                            onClick={() => setSelectedDay(index + 1)}
                          >
                            <span className="text-xs">{day}</span>
                            <span className="text-xs opacity-60">{index + 1}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {routineType === 'multi'
                          ? `${selectedWeek}주차 ${selectedDay}일차`
                          : '운동 목록'}
                      </h3>
                      <Button
                        type="button"
                        onClick={openExerciseInfoModalForSelectedDay}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        운동 추가
                      </Button>
                    </div>

                    {getCurrentDayExercises().length === 0 ? (
                      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                        <CardContent className="flex items-center justify-center py-8">
                          <p className="text-center text-gray-500">
                            {routineType === 'multi'
                              ? '운동을 추가하지 않으면 휴식일로 지정됩니다'
                              : '운동을 추가해보세요'}
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {getCurrentDayExercises().map((exercise) => (
                          <Card
                            key={`${currentDay}-${exercise}`}
                            className="border-gray-200 bg-white"
                          >
                            <CardContent className="p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">{exercise.title}</h4>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveExercise(exercise.title)}
                                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              {/* TODO */}
                              {/* 운동 별 세트 수정하는 부분 */}
                              {/* <div className="space-y-3">
                                {exercise.map((set, setIndex) => (
                                  <div
                                    key={setIndex}
                                    className="grid grid-cols-3 items-center gap-3"
                                  >
                                    <div className="text-center">
                                      <Badge variant="secondary">{setIndex + 1}세트</Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-600">
                                        목표 무게 (kg)
                                      </Label>
                                      <Input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={set.targetWeight}
                                        onChange={(e) =>
                                          updateExerciseSet(
                                            exercise.id,
                                            setIndex,
                                            'targetWeight',
                                            Number.parseFloat(e.target.value) || 0
                                          )
                                        }
                                        className="h-8 bg-white text-sm"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-600">휴식 (초)</Label>
                                      <Input
                                        type="number"
                                        min="0"
                                        step="30"
                                        value={set.targetRest}
                                        onChange={(e) =>
                                          updateExerciseSet(
                                            exercise.id,
                                            setIndex,
                                            'targetRest',
                                            Number.parseInt(e.target.value) || 0
                                          )
                                        }
                                        className="h-8 bg-white text-sm"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div> */}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="w-full flex-shrink-0">
              <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900">루틴 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
                    <div className="space-y-1">
                      <Label className="text-base font-semibold text-gray-900">공개 루틴</Label>
                      <p className="text-sm text-gray-600">다른 사용자들과 루틴을 공유합니다</p>
                    </div>
                    <Switch
                      checked={form.watch('isPublic')}
                      onCheckedChange={(checked) => form.setValue('isPublic', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">루틴 설명 (선택사항)</Label>
                    <Textarea
                      id="description"
                      placeholder="이 루틴에 대한 설명을 작성해보세요..."
                      rows={4}
                      {...form.register('description')}
                      className="resize-none border-gray-200 bg-white"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => onOpen('CREATOR_CONFIRM')}
                    className="h-12 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    size="lg"
                  >
                    루틴 생성하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
