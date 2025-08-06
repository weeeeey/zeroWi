'use client';

import { useModal } from '@/hooks/use-modal';
import { RecordedExercise } from '@/types/record';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import ContainerModal from './container-modal';
import SectionModal from './section-modal';

const MAX_HEIGHT = '90vh';

export default function RecordDetailModal() {
  const searchParams = useSearchParams();
  const { isOpen, modalType } = useModal();
  let modalOpen = isOpen && modalType === 'RECORD_DETAIL';

  if (!modalOpen) return null;
  const recordId = searchParams.get('recordId');
  if (!recordId) modalOpen = false;
  return (
    <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
      <RecordDetail recordId={recordId!} />
    </ContainerModal>
  );
}

function RecordDetail({ recordId }: { recordId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseRecord, setExerciseRecord] = useState<RecordedExercise[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/record?recordId=${recordId}`);
      const parse = await res.json();

      if (!parse.success) {
        setExerciseRecord(null);
      }
      setExerciseRecord(parse.records);

      setIsLoading(false);
    })();
  }, [recordId]);

  // skeleton
  if (isLoading) {
    const skeletonData = Array(2)
      .fill(null)
      .map(() => ({
        sets: Array(3).fill(null),
      }));
    return (
      <SectionModal
        maxHeight={MAX_HEIGHT}
        className={`flex flex-col overflow-y-scroll bg-gradient-to-b from-indigo-600 to-blue-400 p-4`}
      >
        <div className="space-y-4">
          {skeletonData.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex}>
              <div className="px-2 pb-2">
                {/* 헤더 스켈레톤 */}
                <header className="mb-2 flex items-center justify-between px-3 py-2">
                  <Skeleton className="h-8 w-32" />
                </header>

                {/* 세트 컨텐츠 스켈레톤 */}
                {exercise.sets.map((_, setIndex) => (
                  <div
                    key={setIndex}
                    className="relative mb-2 flex items-end gap-4 rounded-lg border p-3"
                  >
                    {/* 세트 번호 스켈레톤 */}
                    <div className="absolute top-0 left-2 -translate-y-1/2 rounded-md bg-white px-2">
                      <Skeleton className="h-4 w-12" />
                    </div>

                    {/* 무게 및 횟수 입력 필드 스켈레톤 */}
                    <div className="grid flex-1 grid-cols-2 gap-2">
                      <div>
                        <Skeleton className="mb-1 h-3 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div>
                        <Skeleton className="mb-1 h-3 w-8" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionModal>
    );
  }

  if (!exerciseRecord || exerciseRecord.length === 0) {
    return (
      <SectionModal
        maxHeight={MAX_HEIGHT}
        className={`flex flex-col overflow-y-scroll bg-gradient-to-b from-indigo-600 to-blue-400 p-4`}
      >
        <div className="flex h-full items-center justify-center text-2xl font-bold">
          휴식 데이 또는 운동 기록이 없습니다
        </div>
      </SectionModal>
    );
  }

  return (
    <SectionModal
      maxHeight={MAX_HEIGHT}
      className={`flex flex-col overflow-y-scroll bg-gradient-to-b from-indigo-600 to-blue-400 p-4`}
    >
      {exerciseRecord.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex}>
          <div className="px-2 pb-2">
            {/* 0. 헤더 */}
            <header className="mb-2 flex items-center justify-between px-3 py-2 text-slate-100">
              <h3 className="text-2xl font-bold">{exercise.title}</h3>
            </header>

            {/* 세트 컨텐츠 */}
            {exercise.sets.map((set, setIndex) => (
              <div
                key={setIndex}
                className={`relative mb-2 flex items-end gap-4 rounded-lg border p-3`}
              >
                {/* 1. 세트 번호 */}
                <div className="absolute top-0 left-2 -translate-y-1/2 rounded-md bg-white px-2 text-slate-500">
                  <h5 className="text-sm font-medium">Set {setIndex + 1}</h5>
                </div>

                {/* 2. 무게 및 횟수 입력 필드 */}
                <div className="grid flex-1 grid-cols-2 gap-2 text-white">
                  <div>
                    <label className="mb-1 block text-xs">무게 (kg)</label>

                    <Input
                      className="bg-white text-black disabled:opacity-100"
                      type="number"
                      value={set.actualWeight || '0'}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs">횟수</label>
                    <Input
                      className="bg-white text-black disabled:opacity-100"
                      type="number"
                      disabled
                      value={set.actualReps || '0'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </SectionModal>
  );
}
