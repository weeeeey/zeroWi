'use client';

import { CreateRoutineExercise } from '@/hooks/use-add-exercise-routine';
import { useExerciseTime } from '@/hooks/use-exercise-time';
import { RecordedExercise } from '@/types/record';
import { useCallback, useEffect, useState } from 'react';

import RecordFooter from './record-footer';
import RecordHeader from './record-header';
import RecordMain from './record-main';

function RecordContainer({ program }: { program: CreateRoutineExercise[] }) {
  const [totalTime, setTotalTime] = useState(0); // 전체 운동 시간 (분)
  const {
    isResting,
    restTime,
    exerciseTime,
    adjustRestTime,
    endWorkout,
    startExercise,
    startRest,
  } = useExerciseTime();

  const [exercises, setExercises] = useState<RecordedExercise[]>([]);

  // 초기 데이터 설정
  useEffect(() => {
    const initialExercises: RecordedExercise[] = program.map((exercise) => ({
      title: exercise.title,
      isCompleted: false,
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
  const remainingExercises = exercises.filter((exercise) => !exercise.isCompleted).length;

  // 세트 완료 처리
  const completeSet = useCallback(
    (exerciseIndex: number, setIndex: number) => {
      setExercises((prev) => {
        const updated = [...prev];
        updated[exerciseIndex].sets[setIndex].isCompleted = true;

        // 모든 세트가 완료되면 운동 완료 처리
        const allSetsCompleted = updated[exerciseIndex].sets.every((set) => set.isCompleted);
        if (allSetsCompleted) {
          updated[exerciseIndex].isCompleted = true;
        }

        return updated;
      });

      // 휴식 시작
      const currentSet = exercises[exerciseIndex].sets[setIndex];

      startRest(currentSet.restSeconds);
    },
    [exercises, startRest]
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
    // 운동 종료 로직 (예: 결과 저장, 페이지 이동 등)
    alert('운동이 종료되었습니다!');
    // try {
    //   const res = await fetch('/api/record', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       aaaa: 'asd',
    //     }),
    //   });
    // } catch (error) {
    //   return error;
    // }
  }, []);

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
