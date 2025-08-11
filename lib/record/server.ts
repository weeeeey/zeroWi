import { CreateProgramExercise } from '@/hooks/use-add-exercise-program';
import { RecordWithTotalWeight, RecordedExercise } from '@/types/record';
import { ProgramRoutineItem } from '@/types/program';

import prisma from '../db';

/**
 * 특정 프로그램 ID와 요일에 해당하는 운동 루틴을 가져옵니다.
 * 프로그램 데이터에서 해당 요일의 운동 목록을 추출합니다.
 *
 * @param {string} programId - 프로그램을 조회할 ID.
 * @param {string} day - 조회할 요일 (예: 'Day 1', 'Day 2').
 * @returns {Promise<CreateProgramExercise[] | undefined>} 해당 요일의 운동 목록 또는 찾을 수 없으면 `undefined`.
 */
export const getTodayProgramFromProgram = async (
  programId: string,
  day: string
): Promise<CreateProgramExercise[] | undefined> => {
  try {
    if (!day || !programId) return undefined;
    const program = await prisma.program.findFirst({
      where: {
        id: programId,
      },
      select: {
        routines: true, // Changed from program: true to routines: true
      },
    });

    if (!program || !program.routines) { // Changed program.program to program.routines
      return undefined;
    }

    const programData = program.routines as ProgramRoutineItem[]; // Changed program.program to program.routines

    return programData.find((v) => v.day === day)?.exercises;
  } catch {
    return undefined;
  }
};

/**
 * 특정 사용자의 모든 운동 기록을 가져오고, 각 기록에 대한 통계(총 세트 수, 총 무게, 운동 종류 개수)를 계산합니다.
 *
 * @param {string} userId - 운동 기록을 조회할 사용자의 ID.
 * @returns {Promise<RecordWithTotalWeight[]>} 통계 정보가 포함된 운동 기록 배열.
 */
export async function getRecords(userId: string): Promise<RecordWithTotalWeight[]> {
  try {
    const records = await prisma.record.findMany({
      where: {
        userId,
      },
      include: {
        program: {
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
        program: record.program,
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
