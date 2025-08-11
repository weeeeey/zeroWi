import type { ExerciseDevied } from '@/types/exercise';
import type { ProgramSortCriteria, ProgramType } from '@/types/program';
import { ProgramDifficulty } from '@prisma/client';

/**
 * 프로그램 ID를 위한 URL 검색 파라미터 키입니다.
 */
export const SEARCHPARAM_PROGRAMID = 'programId';

/**
 * 프로그램의 최대 일수 (주 단위)입니다. (예: 8주 = 56일)
 */
export const MAX_DAYS = 8 * 7;
/**
 * 운동 세트의 최대 개수입니다.
 */
export const MAX_EXERCISE_SET_COUNT = 30;
/**
 * 운동 분할 타입 목록입니다.
 */
export const EXERCISE_DEVIDES: ExerciseDevied[] = ['무분할', '2분할', '3분할', '4분할', '5분할'];

/**
 * 로컬 스토리지에 프로그램 로컬 키를 저장하는 데 사용되는 키입니다.
 */
export const LOCAL_KEY_PROGRAM_LOCAL_KEY = 'programLocalKey';
/**
 * 로컬 스토리지에 프로그램 타입을 저장하는 데 사용되는 키입니다.
 */
export const LOCAL_KEY_PROGRAM_TYPE_KEY = 'programTypeKey';
/**
 * 로컬 스토리지에 프로그램 정렬 기준을 저장하는 데 사용되는 키입니다.
 */
export const LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY = 'programSortCriteria';

/**
 * 기본 프로그램 타입입니다.
 */
export const DEFAULT_TYPE: ProgramType = 'latestConduct';
/**
 * 기본 프로그램 정렬 기준입니다.
 */
export const DEFAULT_SORT_CRITERIA: ProgramSortCriteria = 'latest';

/**
 * 프로그램 타입 목록입니다.
 */
export const PROGRAM_TYPES: ProgramType[] = ['total', 'latestConduct', 'mine', 'shared'];

/**
 * 프로그램 타입의 한글 이름 매핑입니다.
 */
export const PROGRAM_TITLE_KO: Record<ProgramType, string> = {
  mine: '나만의',
  shared: '공유 받은',
  total: '전체',
  latestConduct: '최근 진행한',
};

/**
 * 프로그램 정렬 기준 목록입니다.
 */
export const PROGRAM_SORT_CRITERIAS: ProgramSortCriteria[] = ['latest', 'enroll'];

/**
 * 프로그램 정렬 기준의 한글 이름 매핑입니다.
 */
export const PROGRAM_SORT_CRITERIAS_KO: Record<ProgramSortCriteria, string> = {
  latest: '최신순',
  enroll: '등록순',
};

/**
 * 프로그램 난이도별 색상 매핑입니다.
 */
export const PROGRAM_DIFFICULT_COLOR: Record<ProgramDifficulty, string> = {
  숙련자: 'bg-red-500',
  중급자: 'bg-blue-500',
  초보자: 'bg-orange-500',
};