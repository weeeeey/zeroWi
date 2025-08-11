import { ProgramType } from '@/types/program';
import { Program } from '@prisma/client';

/**
 * 지정된 타입의 프로그램 목록을 서버로부터 가져옵니다.
 *
 * @param {ProgramType} programType - 가져올 프로그램의 타입 (예: 'total', 'latestConduct', 'mine', 'shared').
 * @returns {Promise<Program[]>} 프로그램 객체 배열을 포함하는 Promise.
 * @throws {Error} 프로그램 데이터를 불러오지 못했거나 서버에서 오류 메시지를 반환한 경우.
 */
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