'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import type { Exercise, SelectedExercise } from '@/types/routine';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_WEEK = 8;
const EXERCISE_DEVIDES = ['무분할', '2분할', '3분할', '4분할', '5분할'];

const routineSchema = z.object({
  name: z.string().min(1, '루틴 이름을 입력해주세요'),
  type: z.enum(['single', 'multi']),
  weeks: z.number().optional(),
  exerciseDevide: z.string().optional(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});

export default function RoutineCreator() {
  const { onOpen } = useModal();
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [exercises, setExercises] = useState<Record<string, Record<number, Exercise[]>>>({});

  const form = useForm<z.infer<typeof routineSchema>>({
    resolver: zodResolver(routineSchema),
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
  const watchedDevide = form.watch('exerciseDevide');

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
                        variant={watchedType === 'single' ? 'default' : 'outline'}
                        className={cn(
                          'h-16 flex-col space-y-1',
                          watchedType === 'single'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : 'border-gray-200 bg-white text-gray-700'
                        )}
                        onClick={() => form.setValue('type', 'single')}
                      >
                        <span className="font-semibold">1일</span>
                        <span className="text-xs opacity-80">단일 운동</span>
                      </Button>
                      <Button
                        type="button"
                        variant={watchedType === 'multi' ? 'default' : 'outline'}
                        className={cn(
                          'h-16 flex-col space-y-1',
                          watchedType === 'multi'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : 'border-gray-200 bg-white text-gray-700'
                        )}
                        onClick={() => form.setValue('type', 'multi')}
                      >
                        <span className="font-semibold">주기 운동</span>
                        <span className="text-xs opacity-80">분할 운동</span>
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`origin-top space-y-3 transition-all ${watchedType === 'multi' ? 'scale-y-full h-full' : 'h-0 scale-y-0'}`}
                  >
                    <Label>기간 선택</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: MAX_WEEK }).map((_, week) => (
                        <Button
                          key={week + 1}
                          type="button"
                          variant={watchedWeeks === week + 1 ? 'default' : 'outline'}
                          className={cn(
                            'h-12',
                            watchedWeeks === week + 1
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                              : 'border-gray-200 bg-white text-gray-700'
                          )}
                          onClick={() => form.setValue('weeks', week + 1)}
                        >
                          {week + 1}주
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
                  {watchedType === 'multi' && (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-100 p-1">
                          {Array.from({ length: watchedWeeks || 1 }, (_, i) => i + 1).map(
                            (week) => (
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
                            )
                          )}
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
                        {watchedType === 'multi'
                          ? `${selectedWeek}주차 ${selectedDay}일차`
                          : '운동 목록'}
                      </h3>
                      <Button
                        type="button"
                        onClick={() => onOpen('EXERCISES_INFO')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        운동 추가
                      </Button>
                    </div>

                    {getCurrentExercises().length === 0 ? (
                      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                        <CardContent className="flex items-center justify-center py-8">
                          <p className="text-center text-gray-500">
                            {watchedType === 'multi'
                              ? '운동을 추가하지 않으면 휴식일로 지정됩니다'
                              : '운동을 추가해보세요'}
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {getCurrentExercises().map((exercise) => (
                          <Card key={exercise.id} className="border-gray-200 bg-white">
                            <CardContent className="p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeExercise(exercise.id)}
                                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-3">
                                {exercise.sets.map((set, setIndex) => (
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
                              </div>
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
