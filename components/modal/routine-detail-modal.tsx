'use client';

import { useModal } from '@/hooks/use-modal';
import { ROUTINE_DIFFICULT_COLOR, SEARCHPARAM_ROUTINEID } from '@/lib/routines/constant';
import { getRoutineDetail } from '@/lib/routines/server';
import { cn } from '@/lib/utils';
import { RoutineDetailWithAuthor, RoutineProgramItem } from '@/types/routine';
import { formatDate } from 'date-fns';
import { Calendar, Clock, Dumbbell, Play, Share2, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import ContainerModal from './container-modal';
import SectionModal from './section-modal';

const MAX_HEIGHT = '90vh';

function RoutineDetailModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'ROUTINE_DETAIL';

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
  const totalWeek = Math.floor(routine.totalDays / 7);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [selectDay, setSelectDay] = useState(1);
  const program = routine.program as RoutineProgramItem[];
  const currentProgram = program.find((v) => v.day === '' + selectDay);

  useEffect(() => {
    const day = (currentWeek - 1) * 7 + currentDay;
    setSelectDay(day);
  }, [currentWeek, currentDay]);

  useEffect(() => {
    setCurrentDay(1);
  }, [currentWeek]);

  return (
    <SectionModal className={`flex flex-col py-2`} maxHeight={MAX_HEIGHT}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="mb-4 space-y-2">
          {/* 루틴 정보 */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold text-gray-900">{routine.title}</h2>
              <div className="mb-3 flex items-center gap-2">
                {routine.difficulty && (
                  <Badge className={ROUTINE_DIFFICULT_COLOR[routine.difficulty]}>
                    {routine.difficulty}
                  </Badge>
                )}
                <Badge variant="outline" className="bg-white">
                  {routine.totalDays === 1 ? '단일 루틴' : `${routine.devide}`}
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

          {/* 루틴 제작자와 사용자의 운동 횟수 */}
          <div className="flex items-center justify-between">
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
                <Target className="mr-1 size-4" />
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
        </header>

        <Separator />

        {/* Select Day */}
        {routine.totalDays > 1 && (
          <div className="my-3 flex items-center justify-between space-x-1">
            {/* Week selector */}
            <Select
              defaultValue={'' + currentWeek}
              onValueChange={(v) => {
                setCurrentWeek(+v);
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="주 선택" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalWeek }, (_, idx) => idx + 1).map((v) => (
                  <SelectItem key={`select-week-${v}`} value={'' + v}>
                    {v}주차
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Day selector */}
            <div className="grid h-full flex-1 grid-cols-7 gap-x-1">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                const dayNumber = index + 1;
                let hasProgram = false;
                const findedExercise = program.find(
                  (v) => Number(v.day) === (currentWeek - 1) * 7 + dayNumber
                )?.exercises;
                if (findedExercise && findedExercise.length > 0) {
                  hasProgram = true;
                }
                return (
                  <Button
                    key={day}
                    size="sm"
                    variant={currentDay === dayNumber ? 'default' : 'outline'}
                    className={cn(
                      'relative text-center text-xs',
                      currentDay === dayNumber
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : hasProgram
                          ? 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50'
                          : 'border-gray-200 bg-gray-50 text-gray-400',
                      !hasProgram && 'opacity-60'
                    )}
                    onClick={() => setCurrentDay(dayNumber)}
                  >
                    <span>{day}</span>
                    {hasProgram && (
                      <div className="absolute -inset-[2px] -z-10 rounded-md bg-slate-400" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Exercise List */}
        <div className="h-full flex-1 space-y-2 overflow-y-scroll">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {routine.totalDays === 1 ? '운동 목록' : `${currentDay}일차`}
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
              {currentProgram.exercises.map((exercise) => (
                <Card
                  key={exercise.title}
                  className="border-0 bg-slate-100 p-0 shadow-sm backdrop-blur-sm"
                >
                  <CardContent className="px-4 py-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                          <Dumbbell className="size-4 text-white" />
                        </div>

                        <h4 className="text-sm font-semibold text-gray-900">{exercise.title}</h4>
                      </div>
                      <Badge variant="outline" className="bg-slate-400 text-xs text-white">
                        {exercise.sets.length}세트
                      </Badge>
                    </div>

                    <ul className="space-y-2">
                      {exercise.sets.map((set, setIndex) => (
                        <li
                          key={setIndex}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-2 text-xs"
                        >
                          <span className="font-medium text-gray-700">{setIndex + 1}세트</span>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <span>{set.targetWeight || 0}kg</span>
                            {set.targetWeight && <span>{set.targetReps || 0}회</span>}
                            <span>{set.restSeconds}초 휴식</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}

        <div className="sticky bottom-4 mx-4">
          <Link
            href={`/record/${routine.id}?day=${selectDay}`}
            className="flex w-full items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white hover:from-blue-600 hover:to-indigo-700"
          >
            <Play className="size-4 stroke-3" />
            <div className="font-bold">시작하기</div>
          </Link>
        </div>
      </div>
    </SectionModal>
  );
}

export default RoutineDetailModal;
