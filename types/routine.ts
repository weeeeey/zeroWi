export type RoutineType = 'shared' | 'sharing' | 'total' | 'mine' | 'latest';
export type RoutineSortCriteria = 'latest' | 'enroll';

export interface RoutineFormData {
  name: string;
  type: 'single' | 'multi';
  weeks?: number;
  exercises: Record<string, Record<number, Exercise[]>>;
  isPublic: boolean;
  description?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  targetWeight: number;
  targetRest: number;
}

export interface SelectedExercise {
  id: string;
  name: string;
  category: string;
}
