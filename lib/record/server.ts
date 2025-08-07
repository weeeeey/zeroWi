import { CreateRoutineExercise } from '@/hooks/use-add-exercise-routine';
import { RecordWithTotalWeight, RecordedExercise } from '@/types/record';
import { RoutineProgramItem } from '@/types/routine';

import prisma from '../db';

export const getTodayProgramFromRoutine = async (
  routineId: string,
  day: string
): Promise<CreateRoutineExercise[] | undefined> => {
  try {
    if (!day || !routineId) return undefined;
    const routine = await prisma.routine.findFirst({
      where: {
        id: routineId,
      },
      select: {
        program: true,
      },
    });

    if (!routine || !routine.program) {
      return undefined;
    }

    const programData = routine.program as RoutineProgramItem[];

    return programData.find((v) => v.day === day)?.exercises;
  } catch {
    return undefined;
  }
};

export async function getRecords(userId: string): Promise<RecordWithTotalWeight[]> {
  try {
    const records = await prisma.record.findMany({
      where: {
        userId,
      },
      include: {
        routine: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 각 기록의 통계 계산

    const recordsWithStats = records.map((record) => {
      const exerciseRecords = record.records as RecordedExercise[];

      // 총 세트 수 계산
      const totalSets = exerciseRecords.reduce((total, exercise) => {
        const completeSetsLength = exercise.sets.filter((v) => v.isCompleted).length;
        return total + completeSetsLength;
      }, 0);

      // 총 무게 계산 (무게 * 횟수의 총합)
      const totalWeight = exerciseRecords.reduce((total, exercise) => {
        const exerciseWeight = exercise.sets.reduce((setTotal, set) => {
          const weight = set.actualWeight || 0;
          let reps = set.actualReps ? Number(set.actualReps) : 0;
          if (isNaN(reps)) reps = 0;

          const curSetTotal = reps * weight;
          return setTotal + curSetTotal;
        }, 0);
        return total + exerciseWeight;
      }, 0);

      // 운동 종류 개수
      const exerciseCount = exerciseRecords.length;

      return {
        id: record.id,
        routine: record.routine,
        memo: record.memo,
        createdAt: record.createdAt,
        totalSets,
        totalWeight,
        exerciseCount,
      };
    });

    return recordsWithStats;
  } catch {
    return [];
  }
}
