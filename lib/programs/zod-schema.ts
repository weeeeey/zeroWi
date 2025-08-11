import { ProgramDifficulty } from '@prisma/client';
import * as z from 'zod';

import { EXERCISE_DEVIDES } from './constant';

/**
 * 프로그램 생성 타입을 정의합니다.
 */
export type CreateProgramType = 'single' | 'multi';

/**
 * 프로그램 데이터의 유효성 검사를 위한 Zod 스키마입니다.
 */
export const programSchema = z.object({
  /**
   * 프로그램 이름. 최소 1자 이상이어야 합니다.
   */
  name: z.string().min(1, '프로그램 이름을 입력해주세요'),
  /**
   * 프로그램 타입 (단일 또는 다중).
   */
  type: z.enum(['single', 'multi'] as [CreateProgramType, ...CreateProgramType[]]),
  /**
   * 프로그램 주차 수. 'multi' 타입일 경우 필수입니다.
   */
  weeks: z.number().optional(), // use-program-creator에서 기본값 1로 설정하므로 optional로 둠
  /**
   * 운동 분할 타입. 선택 사항입니다.
   */
  exerciseDevide: z.enum(EXERCISE_DEVIDES).optional(),
  /**
   * 프로그램 난이도. 선택 사항입니다.
   */
  difficulty: z.enum(ProgramDifficulty).optional(),
  /**
   * 프로그램 공개 여부.
   */
  isPublic: z.boolean(),
  /**
   * 프로그램 설명. 선택 사항입니다.
   */
  description: z.string().optional(),
});

/**
 * `programSchema`의 추론된 타입입니다.
 */
export type ProgramFormData = z.infer<typeof programSchema>;
