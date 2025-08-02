import { CreateRoutineExercise } from '@/hooks/use-add-exercise-routine';
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
