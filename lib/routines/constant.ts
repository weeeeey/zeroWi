import { RoutineSortCriteria, RoutineType } from '@/types/routine';

export const LOCAL_KEY_ROUTINE_LOCAL_KEY = 'routineLocalKey';
export const LOCAL_KEY_ROUTINE_TYPE_KEY = 'routineTypeKey';
export const LOCAL_KEY_ROUTINE_SORT_CRITERIA_KEY = 'routineSortCriteria';

export const DEFAULT_TYPE: RoutineType = 'latest';
export const DEFAULT_SORT_CRITERIA: RoutineSortCriteria = 'latest';

export const ROUTINE_TYPES: RoutineType[] = ['latest', 'mine', 'shared', 'sharing', 'total'];

export const ROUTINE_TITLE_KO: Record<RoutineType, string> = {
  mine: '나만의',
  shared: '공유 받은',
  sharing: '공유 중인',
  total: '전체',
  latest: '최근 진행한',
};

export const ROUTINE_SORT_CRITERIAS: RoutineSortCriteria[] = ['latest', 'enroll'];

export const ROUTINE_SORT_CRITERIAS_KO: Record<RoutineSortCriteria, string> = {
  latest: '최신순',
  enroll: '등록순',
};
