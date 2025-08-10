import { ProgramType } from '@/types/program';
import { Program } from '@prisma/client';

export const fetchPrograms = async (programType: ProgramType): Promise<Program[]> => {
  const res = await fetch(`/api/program/all?programType=${programType}`);

  if (!res.ok) {
    throw new Error('프로그램 데이터를 불러오지 못했습니다.');
  }

  const parsed = await res.json();
  if (parsed.success === false) {
    throw new Error(parsed.message);
  }
  return parsed.data;
};
