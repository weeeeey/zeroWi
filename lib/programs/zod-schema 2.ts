import { ProgramDifficulty } from '@prisma/client';
import * as z from 'zod';

import { EXERCISE_DEVIDES } from './constant';

export type CreateProgramType = 'single' | 'multi';

export const programSchema = z.object({
  name: z.string().min(1, '프로그램 이름을 입력해주세요'),
  exerciseDevide: z.enum(EXERCISE_DEVIDES).optional(),
  difficulty: z.enum(ProgramDifficulty).optional(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});

export type ProgramFormData = z.infer<typeof programSchema>;
