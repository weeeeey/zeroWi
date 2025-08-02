import { RoutineProgramItem } from '@/types/routine';

import prisma from '../db';

export const getTodayProgramFromRoutine = async (routineId: string, day: string) => {
  try {
    if (!day || !routineId) return null;
    const routine = await prisma.routine.findFirst({
      where: {
        id: routineId,
      },
      select: {
        program: true,
      },
    });

    if (!routine || !routine.program) {
      return null;
    }

    // program이 Json 타입이므로 파싱
    const programData = routine.program as RoutineProgramItem[];

    // day 번호에 해당하는 프로그램 찾기 (0-based index)

    return programData.find((v) => v.day === day);
  } catch {
    return null;
  }
};
