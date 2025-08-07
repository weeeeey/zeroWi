import { RoutineType } from '@/types/routine';
import { Routine } from '@prisma/client';

export const fetchRoutines = async (routineType: RoutineType): Promise<Routine[]> => {
  const res = await fetch(`/api/routine/all?routineType=${routineType}`);

  if (!res.ok) {
    throw new Error('루틴 데이터를 불러오지 못했습니다.');
  }

  const parsed = await res.json();
  if (parsed.success === false) {
    throw new Error(parsed.message);
  }
  return parsed.data;
};
