'use client';

import { useModal } from '@/hooks/use-modal';
import { PROGRAM_DIFFICULT_COLOR, SEARCHPARAM_PROGRAMID } from '@/lib/programs/constant';
import { cn } from '@/lib/utils';
import { ProgramDetailWithAuthor, ProgramRoutineItem } from '@/types/program';
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
import { Skeleton } from '../ui/skeleton';
import ContainerModal from './container-modal';
import SectionModal from './section-modal';

const MAX_HEIGHT = '90vh';

function ProgramDetailModal() {
  const { isOpen, modalType } = useModal();
  let modalOpen = isOpen && modalType === 'PROGRAM_DETAIL';

  const searchParam = useSearchParams();
  const programId = searchParam.get(SEARCHPARAM_PROGRAMID);
  const [programDetail, setProgramDetail] = useState<ProgramDetailWithAuthor>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modalOpen && programId) {
      (async () => {
        const res = await fetch(`/api/program/${programId}`);
        const parsed = await res.json();
        if (!parsed.success) return;

        setProgramDetail(parsed.data);
        setIsLoading(false);
      })();
    }
  }, [modalOpen, programId]);

  if (!programId) modalOpen = false;

  if (modalOpen) {
    return (
      <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
        <SectionModal maxHeight={MAX_HEIGHT} className={`flex flex-col p-4 h-[${[MAX_HEIGHT]}]`}>
          {isLoading || !programDetail?.id ? (
            <ProgramDetailSkeleton />
          ) : (
            <ProgramDetail program={programDetail} />
          )}
        </SectionModal>
      </ContainerModal>
    );
  }
}

// totalwDays가 2 이상이면 요일 선택 가능한 프로그램이므로 이 땐 가장 최근 수행했던 일수를 찾아와서 그걸로 디폴트 해줘야함

function ProgramDetail({ program }: { program: ProgramDetailWithAuthor }) {
  const totalWeek = Math.floor(program.totalDays / 7);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [selectDay, setSelectDay] = useState(1);
  const programContent = program.routines as ProgramRoutineItem[];
  const currentProgram = programContent.find((v) => v.day === '' + selectDay);

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
          {/* 프로그램 정보 */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold text-gray-900">{program.title}</h2>
              <div className="mb-3 flex items-center gap-2">
                {program.difficulty && (
                  <Badge className={PROGRAM_DIFFICULT_COLOR[program.difficulty]}>
                    {program.difficulty}
                  </Badge>
                )}
                <Badge variant="outline" className="bg-white">
                  {program.totalDays === 1 ? '단일 프로그램' : `${program.divide}`}
                </Badge>
                {program.isShared && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <Share2 className="mr-1 h-3 w-3" />
                    공유
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* 프로그램 제작자와 사용자의 운동 횟수 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative size-8 overflow-hidden rounded-full bg-slate-100">
                <Image src={program.author.picture} fill alt="저자 프로필 이미지" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{program.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(program.createdAt, 'yy-MM-dd')}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-1 flex items-center text-sm text-gray-600">
                <Target className="mr-1 size-4" />
                <span>{program.executeCount}회 실행</span>
              </div>
              {program.latestExecuteDate && (
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 size-3" />
                  <span>최근 {formatDate(program.latestExecuteDate, 'yy-MM-dd')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {program.description && (
            <div className="mb-4">
              <p className="text-sm leading-relaxed text-gray-600">{program.description}</p>
            </div>
          )}
        </header>

        <Separator />

        {/* Select Day */}
        {program.totalDays > 1 && (
          <div className="my-3 flex items-center justify-between space-x-1">
            {/* Week selector */}
            <Select
              defaultValue={'' + currentWeek}
              onValueChange={(v) => {
                setCurrentWeek(+v);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="주 선택" />
              </SelectTrigger>
              <SelectContent className="w-24 min-w-0">
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
                const findedExercise = programContent.find(
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
        <div className="h-full flex-1 space-y-2 overflow-y-scroll pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {program.totalDays === 1 ? '운동 목록' : `${currentDay}일차`}
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
                  {program.totalDays === 1 ? '등록된 운동이 없습니다' : '휴식일입니다'}
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
                          {' '}
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
            href={`/record/${program.id}?day=${selectDay}`}
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

function ProgramDetailSkeleton() {
  return (
    <div className="flex h-full flex-col py-2">
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="mb-4 space-y-2">
          {/* 프로그램 정보 */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Skeleton className="mb-2 h-7 w-64" />
              <div className="mb-3 flex items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          </div>

          {/* 프로그램 제작자와 사용자의 운동 횟수 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="size-8 rounded-full" />
              <div>
                <Skeleton className="mb-1 h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="text-right">
              <div className="mb-1 flex items-center justify-end">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center justify-end">
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </header>

        <Separator />

        {/* Select Day */}
        <div className="my-3 flex items-center justify-between space-x-1">
          {/* Week selector */}
          <Skeleton className="h-10 w-24" />

          {/* Day selector */}
          <div className="grid h-full flex-1 grid-cols-7 gap-x-1">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-8" />
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="h-full flex-1 space-y-2 overflow-y-scroll">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>

          <div className="space-y-3">
            {/* Exercise Cards */}
            {Array.from({ length: 1 }).map((_, exerciseIndex) => (
              <Card key={exerciseIndex} className="border-0 bg-slate-100 p-0 shadow-sm">
                <CardContent className="px-4 py-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="size-8 rounded-lg" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-5 w-12" />
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, setIndex) => (
                      <div
                        key={setIndex}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
                      >
                        <Skeleton className="h-4 w-12" />
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-4 mx-4">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default ProgramDetailModal;
