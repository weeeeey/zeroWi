import { RoutineDetailWithAuthor } from '@/types/routine';

import prisma from '../db';

export const getRoutineDetail = async (
  routineId: string
): Promise<RoutineDetailWithAuthor | null> => {
  try {
    const routineDetail = await prisma.routine.findUnique({
      where: {
        id: routineId,
      },
      include: {
        author: {
          select: {
            name: true,
            picture: true,
            id: true,
          },
        },
      },
    });

    return routineDetail;
  } catch {
    return null;
  }
};
