import { RoutineDifficulty } from '@prisma/client';
import * as z from 'zod';

import { EXERCISE_DEVIDES } from './constant';

export type CreateRoutineType = 'single' | 'multi';

export const routineSchema = z.object({
  name: z.string().min(1, '루틴 이름을 입력해주세요'),
  exerciseDevide: z.enum(EXERCISE_DEVIDES).optional(),
  difficulty: z.enum(RoutineDifficulty).optional(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});

export type RoutineFormData = z.infer<typeof routineSchema>;
