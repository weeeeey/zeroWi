import { POST } from './route';
import { NextRequest } from 'next/server';
import { RequestProgramFormData } from '@/types/program';

// Mocking external dependencies
jest.mock('@/lib/auth/server', () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    program: {
      create: jest.fn(),
    },
  },
}));

// Mock the entire 'next/server' module
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      // Mimic the actual NextResponse.json behavior by returning a mock Response object
      const status = init?.status || 200;
      const headers = init?.headers || {};

      return {
        status: status,
        headers: headers,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        // Add other Response methods if needed
      };
    }),
  },
  NextRequest: jest.fn((input, init) => {
    // Mimic NextRequest constructor if needed, or just return a simple mock
    return {
      json: jest.fn(() => Promise.resolve(input)), // Assuming input is the body for json()
      // Add other NextRequest methods/properties if needed
    };
  }),
}));

// Import mocked functions
import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server'; // Import the mocked NextResponse

// Import constants for correct enum values
import { EXERCISE_DEVIDES } from '@/lib/programs/constant';
import { ProgramDifficulty } from '@prisma/client';

describe('Program API - POST', () => {
  const mockUser = { id: 'user123', name: 'Test User' };

  beforeEach(() => {
    // Reset mocks before each test
    (getCurrentUser as jest.Mock).mockClear();
    (prisma.program.create as jest.Mock).mockClear();
    (NextResponse.json as jest.Mock).mockClear();
  });

  it('should create a program successfully with valid data', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (prisma.program.create as jest.Mock).mockResolvedValue({
      id: 'program123',
      authorId: mockUser.id,
      title: 'Test Program',
      // ... other fields as they would be returned by Prisma
    });

    const requestBody: RequestProgramFormData = {
      name: 'My New Program',
      authorId: mockUser.id,
      createExerciseInfos: { 1: [] }, // Changed 'Day 1' to 1 (number key)
      isPublic: true,
      totalDays: 1,
      description: 'A test program',
      difficulty: ProgramDifficulty.초보자, // Use actual enum value
      exerciseDevide: EXERCISE_DEVIDES[0], // Use actual constant value (e.g., '무분할')
      type: 'single', // Corrected field name from programType to type
    };

    // Create a mock NextRequest object
    const mockRequest = {
      json: async () => requestBody,
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.programId).toBe('program123');
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        authorId: mockUser.id,
        title: requestBody.name,
        isPublic: requestBody.isPublic,
        description: requestBody.description,
        difficulty: requestBody.difficulty,
        divide: requestBody.exerciseDevide,
        totalDays: requestBody.totalDays,
      }),
    });
  });

  it('should return 400 if authorId does not match current user', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const requestBody: RequestProgramFormData = {
      name: 'My New Program',
      authorId: 'anotherUser', // Mismatched authorId
      createExerciseInfos: { 1: [] }, // Changed 'Day 1' to 1 (number key)
      isPublic: true,
      totalDays: 1,
      description: 'A test program',
      difficulty: ProgramDifficulty.초보자, // Use actual enum value
      exerciseDevide: EXERCISE_DEVIDES[0], // Use actual constant value
      type: 'single', // Corrected field name
    };

    const mockRequest = {
      json: async () => requestBody,
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    const textResponse = await response.json();
    expect(textResponse).toBe('로그인 된 유저의 정보가 잘못 되었습니다.');
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).not.toHaveBeenCalled();
  });

  it('should return 400 if current user is null', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(null); // No current user

    const requestBody: RequestProgramFormData = {
      name: 'My New Program',
      authorId: mockUser.id,
      createExerciseInfos: { 1: [] }, // Changed 'Day 1' to 1 (number key)
      isPublic: true,
      totalDays: 1,
      description: 'A test program',
      difficulty: ProgramDifficulty.초보자, // Use actual enum value
      exerciseDevide: EXERCISE_DEVIDES[0], // Use actual constant value
      type: 'single', // Corrected field name
    };

    const mockRequest = {
      json: async () => requestBody,
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    const textResponse = await response.json();
    expect(textResponse).toBe('로그인 된 유저의 정보가 잘못 되었습니다.');
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).not.toHaveBeenCalled();
  });

  it('should return 400 with error message for internal errors that are Error instances', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    const errorMessage = 'Database error';
    (prisma.program.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const requestBody: RequestProgramFormData = {
      name: 'My New Program',
      authorId: mockUser.id,
      createExerciseInfos: { 1: [] }, // Changed 'Day 1' to 1 (number key)
      isPublic: true,
      totalDays: 1,
      description: 'A test program',
      difficulty: ProgramDifficulty.초보자, // Use actual enum value
      exerciseDevide: EXERCISE_DEVIDES[0], // Use actual constant value
      type: 'single', // Corrected field name
    };

    const mockRequest = {
      json: async () => requestBody,
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    const textResponse = await response.json();
    expect(textResponse).toBe(errorMessage);
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).toHaveBeenCalledTimes(1);
  });

  it('should return 500 for internal errors that are not Error instances', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    // Mock a non-Error instance rejection
    (prisma.program.create as jest.Mock).mockRejectedValue('unknown error');

    const requestBody: RequestProgramFormData = {
      name: 'My New Program',
      authorId: mockUser.id,
      createExerciseInfos: { 1: [] }, // Changed 'Day 1' to 1 (number key)
      isPublic: true,
      totalDays: 1,
      description: 'A test program',
      difficulty: ProgramDifficulty.초보자, // Use actual enum value
      exerciseDevide: EXERCISE_DEVIDES[0], // Use actual constant value
      type: 'single', // Corrected field name
    };

    const mockRequest = {
      json: async () => requestBody,
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(500);
    const textResponse = await response.json();
    expect(textResponse).toBe('internal error');
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(prisma.program.create).toHaveBeenCalledTimes(1);
  });
});