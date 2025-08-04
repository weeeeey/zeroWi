'use client';

import { toast } from '@/components/ui/custom-toaster';
import PageLoading from '@/components/ui/page-loading';
import { CreateRoutineExercise } from '@/hooks/use-add-exercise-routine';
import { useExerciseTime } from '@/hooks/use-exercise-time';
import { RecordSubmitType, RecordedExercise } from '@/types/record';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import RecordFooter from './record-footer';
import RecordHeader from './record-header';
import RecordMain from './record-main';

function RecordContainer({
  program,
  routineId,
}: {
  program: CreateRoutineExercise[];
  routineId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // 전체 운동 시간 (분)
  const {
    isResting,
    restTime,
    exerciseTime,
    adjustRestTime,

    startRest,
  } = useExerciseTime();

  const [exercises, setExercises] = useState<RecordedExercise[]>([]);

  // 초기 데이터 설정
  useEffect(() => {
    const initialExercises: RecordedExercise[] = program.map((exercise) => ({
      title: exercise.title,
      // isCompleted: false,
      sets: exercise.sets.map((set) => ({
        ...set,
        actualWeight: set.targetWeight,
        actualReps: set.targetReps,
        isCompleted: false,
      })),
    }));
    setExercises(initialExercises);
  }, [program]);

  // 전체 운동 시간 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  // 남은 운동 종목 계산
  const remainingExercises = exercises.filter(
    (exercise) => !exercise.sets.every((v) => v.isCompleted)
  ).length;

  // 세트 완료 처리
  const completeSet = useCallback(
    (exerciseIndex: number, setIndex: number, isCompleted: boolean) => {
      setExercises((prev) => {
        const updated = [...prev];
        const currentSet = updated[exerciseIndex].sets[setIndex];

        // 상태 반전
        currentSet.isCompleted = isCompleted;

        // ✅ 상태가 true로 바뀌는 경우에만 휴식 시작
        if (currentSet.isCompleted) {
          startRest(currentSet.restSeconds);
        }

        return updated;
      });
    },
    [startRest]
  );

  // 세트 기록 업데이트
  const updateSetRecord = useCallback(
    (
      exerciseIndex: number,
      setIndex: number,
      field: 'actualWeight' | 'actualReps',
      value: string
    ) => {
      setExercises((prev) => {
        const updated = [...prev];
        if (field === 'actualWeight') {
          updated[exerciseIndex].sets[setIndex].actualWeight = Number.parseFloat(value) || 0;
        } else {
          updated[exerciseIndex].sets[setIndex].actualReps = value;
        }
        return updated;
      });
    },
    []
  );

  // 운동 종료
  const endRecord = useCallback(async () => {
    const isEnd = window.confirm('운동을 종료 하시겠습니까?');
    if (!isEnd) return;

    try {
      setIsLoading(true);
      const query: RecordSubmitType = {
        routineId,
        records: exercises, // 실제 운동 기록
      };
      const res = await fetch('/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      if (!res.ok) throw new Error('기록 업로드 실패');
      const { recordId } = await res.json();

      router.push(`/record?recordId=${recordId}`);
    } catch {
      toast('기록 업로드 실패');
    } finally {
      setIsLoading(false);
    }
  }, [exercises, routineId, router]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col outline-1">
      <RecordHeader
        endRecord={endRecord}
        remainingExercises={remainingExercises}
        totalTime={totalTime}
      />
      <div className="flex-1 bg-slate-100">
        <RecordMain
          exercises={exercises}
          completeSet={completeSet}
          updateSetRecord={updateSetRecord}
        />
      </div>
      <RecordFooter
        adjustRestTime={adjustRestTime}
        isResting={isResting}
        restTime={restTime}
        exerciseTime={exerciseTime}
      />
    </div>
  );
}

export default RecordContainer;
