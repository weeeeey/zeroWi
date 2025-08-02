import type {
  CreateRoutineExercise,
  RoutineType as CreateRoutineType,
} from '@/hooks/use-add-exercise-routine';
import { routineSchema } from '@/lib/routines/zod-schema';
import { Routine, RoutineDifficulty } from '@prisma/client';
import z from 'zod';

export type RoutineType = 'shared' | 'sharing' | 'total' | 'mine' | 'latest';
export type RoutineSortCriteria = 'latest' | 'enroll';

export type RoutineDetailWithAuthor = Routine & {
  author: {
    id: string;
    name: string;
    picture: string;
  };
};

export type RoutineProgramItem = {
  day: string;
  exercises: CreateRoutineExercise[];
};

/**
 * TODO
 * routine - creator 에서 사용 중인데 이거 수정해야함.
 *
 */
export interface RequestRoutineFormData extends z.infer<typeof routineSchema> {
  authorId: string;
  routineType: CreateRoutineType;
  totalDays: number;
  createExerciseInfos: Record<number, CreateRoutineExercise[]>;
  difficulty?: RoutineDifficulty;
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
