'use client';

import { useModal } from '@/hooks/use-modal';
import { ROUTINE_DIFFICULT_COLOR, SEARCHPARAM_ROUTINEID } from '@/lib/routines/constant';
import { getRoutineDetail } from '@/lib/routines/server';
import { RoutineDetailWithAuthor } from '@/types/routine';
import { Routine } from '@prisma/client';
import { formatDate } from 'date-fns';
import { Clock, Share2, Target } from 'lucide-react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import ContainerModal from './container-modal';
import SectionModal from './section-modal';

const MAX_HEIGHT = '80vh';

function RoutineDetailModal() {
  const { isOpen, modalType } = useModal();
  //   let modalOpen = isOpen && modalType === 'ROUTINE_DETAIL';
  const modalOpen = true;
  const searchParam = useSearchParams();
  const routineId = searchParam.get(SEARCHPARAM_ROUTINEID);
  const [routineDetail, setRoutineDetail] = useState<RoutineDetailWithAuthor>();

  useEffect(() => {
    if (routineDetail !== undefined) return;
    if (modalOpen && routineId) {
      (async () => {
        const res = await getRoutineDetail(routineId);
        if (res === null) return;
        setRoutineDetail(res);
      })();
    }
  }, [modalOpen, routineId, routineDetail]);

  if (modalOpen && routineDetail?.id) {
    return (
      <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
        <SectionModal maxHeight={MAX_HEIGHT} className={`flex flex-col p-4 h-[${[MAX_HEIGHT]}]`}>
          <RoutineDetail routine={routineDetail} />
        </SectionModal>
      </ContainerModal>
    );
  }

  return null;
}

function RoutineDetail({ routine }: { routine: RoutineDetailWithAuthor }) {
  // const {} = routine

  return (
    <SectionModal maxHeight={MAX_HEIGHT} className={`flex flex-col p-4 h-[${[MAX_HEIGHT]}]`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold text-gray-900">{routine.title}</h2>
              <div className="mb-3 flex items-center gap-2">
                {routine.difficulty && (
                  <Badge className={ROUTINE_DIFFICULT_COLOR[routine.difficulty]}>
                    {routine.difficulty}
                  </Badge>
                )}
                <Badge variant="outline" className="bg-white">
                  {routine.totalDays === 1 ? '1일 루틴' : `${routine.totalDays}일 분할`}
                </Badge>
                {routine.isShared && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <Share2 className="mr-1 h-3 w-3" />
                    공유
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Author & Stats */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative size-8 overflow-hidden rounded-full bg-slate-100">
                <Image src={routine.author.picture} fill alt="저자 프로필 이미지" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{routine.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(routine.createdAt, 'yy-mm-dd')}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-1 flex items-center text-sm text-gray-600">
                <Target className="mr-1 h-4 w-4" />
                <span>{routine.executeCount}회 실행</span>
              </div>
              {routine.latestExecuteDate && (
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>최근 {formatDate(routine.latestExecuteDate, 'yy-mm-dd')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {routine.description && (
            <div className="mb-4">
              <p className="text-sm leading-relaxed text-gray-600">{routine.description}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Program Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {/* Multi-day selector */}
          {routine.totalDays > 1 && (
            <div className="mb-6 space-y-4">
              {/* Week selector */}
              {weeksCount > 1 && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 rounded-lg bg-white p-1 shadow-sm">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                      disabled={selectedWeek === 1}
                      className="p-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="px-3 py-1 text-sm font-medium text-gray-900">
                      {selectedWeek}주차
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedWeek(Math.min(weeksCount, selectedWeek + 1))}
                      disabled={selectedWeek === weeksCount}
                      className="p-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Day selector */}
              <div className="grid grid-cols-7 gap-1">
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                  const dayNumber = index + 1;
                  const programIndex = (selectedWeek - 1) * 7 + index;
                  const hasProgram = routine.program[programIndex]?.exercises?.length > 0;

                  return (
                    <Button
                      key={day}
                      size="sm"
                      variant={selectedDay === dayNumber ? 'default' : 'outline'}
                      className={cn(
                        'h-12 flex-col text-xs',
                        selectedDay === dayNumber
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : hasProgram
                            ? 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50'
                            : 'border-gray-200 bg-gray-50 text-gray-400',
                        !hasProgram && 'opacity-60'
                      )}
                      onClick={() => setSelectedDay(dayNumber)}
                    >
                      <span>{day}</span>
                      <span className="opacity-70">{dayNumber}</span>
                      {hasProgram && <div className="mt-0.5 h-1 w-1 rounded-full bg-current" />}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exercise List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {routine.totalDays === 1 ? '운동 목록' : `${selectedWeek}주차 ${selectedDay}일차`}
              </h3>
              {currentProgram?.exercises && (
                <Badge variant="secondary" className="bg-white">
                  {currentProgram.exercises.length}개 운동
                </Badge>
              )}
            </div>

            {!currentProgram?.exercises || currentProgram.exercises.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Calendar className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-center text-sm text-gray-500">
                    {routine.totalDays === 1 ? '등록된 운동이 없습니다' : '휴식일입니다'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {currentProgram.exercises.map((exercise, index) => (
                  <Card
                    key={exercise.id}
                    className="border-0 bg-white/80 shadow-sm backdrop-blur-sm"
                  >
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                            <Dumbbell className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">{exercise.name}</h4>
                            <p className="text-xs text-gray-500">{exercise.category}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {exercise.sets.length}세트
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {exercise.sets.map((set, setIndex) => (
                          <div
                            key={setIndex}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-2 text-xs"
                          >
                            <span className="font-medium text-gray-700">{setIndex + 1}세트</span>
                            <div className="flex items-center space-x-4 text-gray-600">
                              <span>{set.targetWeight}kg</span>
                              {set.reps && <span>{set.reps}회</span>}
                              <span>{set.targetRest}초 휴식</span>
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
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 bg-white p-6 pt-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              닫기
            </Button>
            <Button
              onClick={() => onStartRoutine?.(routine.id)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Play className="mr-2 h-4 w-4" />
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </SectionModal>
  );
}

export default RoutineDetailModal;
