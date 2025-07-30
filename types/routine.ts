export type RoutineType = 'shared' | 'sharing' | 'total' | 'mine' | 'latest';
export type RoutineSortCriteria = 'latest' | 'enroll';

/**
 * TODO
 * routine - creator 에서 사용 중인데 이거 수정해야함.
 *
 */
export interface RoutineFormData {
  name: string;
  type: 'single' | 'multi';
  weeks?: number;
  exercises: Record<string, Record<number, Exercise[]>>;
  isPublic: boolean;
  description?: string;
}

export interface ExerciseSet {
  targetWeight: number;
  targetRest: number;
}
export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export interface SelectedExercise {
  id: string;
  name: string;
  category: string;
}
