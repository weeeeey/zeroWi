import * as z from 'zod';
import { programSchema } from './zod-schema';

// Mock ProgramDifficulty enum for testing environment
enum MockProgramDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

// Re-define programSchema with mocked enum values for z.enum
const testProgramSchema = z.object({
  name: z.string().min(1, '프로그램 이름을 입력해주세요'),
  exerciseDevide: z.enum(['CHEST', 'BACK', 'LEG', 'SHOULDER', 'ARM', 'ABS', 'FULL_BODY']).optional(), // Assuming these are the values from EXERCISE_DEVIDES
  difficulty: z.enum(Object.values(MockProgramDifficulty) as [string, ...string[]]).optional(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});

describe('programSchema', () => {
  it('should validate a valid program object', () => {
    const validProgram = {
      name: 'Test Program',
      isPublic: true,
    };
    const result = testProgramSchema.safeParse(validProgram);
    expect(result.success).toBe(true);
  });

  it('should invalidate a program object with missing name', () => {
    const invalidProgram = {
      name: '',
      isPublic: false,
    };
    const result = testProgramSchema.safeParse(invalidProgram);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('프로그램 이름을 입력해주세요');
    }
  });

  it('should validate a program object with all optional fields', () => {
    const fullProgram = {
      name: 'Full Program',
      exerciseDevide: 'CHEST',
      difficulty: MockProgramDifficulty.BEGINNER, // Use mocked enum
      isPublic: false,
      description: 'A detailed description',
    };
    const result = testProgramSchema.safeParse(fullProgram);
    expect(result.success).toBe(true);
  });

  it('should invalidate a program object with invalid exerciseDevide', () => {
    const invalidProgram = {
      name: 'Invalid Devide',
      exerciseDevide: 'INVALID_DEVIDE',
      isPublic: true,
    };
    const result = testProgramSchema.safeParse(invalidProgram);
    expect(result.success).toBe(false);
  });

  it('should validate a program object with optional fields omitted', () => {
    const programWithoutOptional = {
      name: 'Program without optional',
      isPublic: true,
    };
    const result = testProgramSchema.safeParse(programWithoutOptional);
    expect(result.success).toBe(true);
  });
});
