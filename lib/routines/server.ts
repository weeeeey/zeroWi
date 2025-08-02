import { RoutineDetailWithAuthor } from '@/types/routine';

export const getRoutineDetail = async (
  routineId: string
): Promise<RoutineDetailWithAuthor | null> => {
  try {
    const res = await fetch(`/api/routine/${routineId}`, {
      method: 'GET',
    });

    const parsingResult = await res.json();
    if (!parsingResult.success) throw new Error('잘못된 접근');

    return parsingResult.data;
  } catch {
    return null;
  }
};
