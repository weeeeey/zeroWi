import type { ExerciseDevied } from '@/types/exercise';
import type { ProgramSortCriteria, ProgramType } from '@/types/program';
import { ProgramDifficulty } from '@prisma/client';

export const SEARCHPARAM_PROGRAMID = 'programId';

export const MAX_DAYS = 8 * 7;
export const MAX_EXERCISE_SET_COUNT = 30;
export const EXERCISE_DEVIDES: ExerciseDevied[] = ['무분할', '2분할', '3분할', '4분할', '5분할'];

export const LOCAL_KEY_PROGRAM_LOCAL_KEY = 'programLocalKey';
export const LOCAL_KEY_PROGRAM_TYPE_KEY = 'programTypeKey';
export const LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY = 'programSortCriteria';

export const DEFAULT_TYPE: ProgramType = 'latestConduct';
export const DEFAULT_SORT_CRITERIA: ProgramSortCriteria = 'latest';

export const PROGRAM_TYPES: ProgramType[] = ['total', 'latestConduct', 'mine', 'shared'];

export const PROGRAM_TITLE_KO: Record<ProgramType, string> = {
  mine: '나만의',
  shared: '공유 받은',
  total: '전체',
  latestConduct: '최근 진행한',
};

export const PROGRAM_SORT_CRITERIAS: ProgramSortCriteria[] = ['latest', 'enroll'];

export const PROGRAM_SORT_CRITERIAS_KO: Record<ProgramSortCriteria, string> = {
  latest: '최신순',
  enroll: '등록순',
};

export const PROGRAM_DIFFICULT_COLOR: Record<ProgramDifficulty, string> = {
  숙련자: 'bg-red-500',
  중급자: 'bg-blue-500',
  초보자: 'bg-orange-500',
};
