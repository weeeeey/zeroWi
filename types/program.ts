import type { CreateProgramExercise } from '@/hooks/use-add-exercise-program';
import { programSchema } from '@/lib/programs/zod-schema';
import { Program, ProgramDifficulty } from '@prisma/client';
import z from 'zod';

export type ProgramType = 'shared' | 'total' | 'mine' | 'latestConduct';
export type ProgramSortCriteria = 'latest' | 'enroll';

export type ProgramDetailWithAuthor = Program & {
  author: {
    id: string;
    name: string;
    picture: string;
  };
};

export type ProgramRoutineItem = {
  day: string;
  exercises: CreateProgramExercise[];
};

/**
 * TODO
 * program - creator 에서 사용 중인데 이거 수정해야함.
 *
 */
export interface RequestProgramFormData extends z.infer<typeof programSchema> {
  authorId: string;
  // programType: CreateProgramType; // Removed this line
  totalDays: number;
  createExerciseInfos: Record<number, CreateProgramExercise[]>;
  difficulty?: ProgramDifficulty;
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
