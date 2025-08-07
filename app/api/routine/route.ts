import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { RequestRoutineFormData } from '@/types/routine';
import { NextResponse } from 'next/server';

// 루틴 생성 api
export async function POST(req: Request) {
  try {
    const data: RequestRoutineFormData = await req.json();
    const currentUser = await getCurrentUser();

    if (data.authorId !== currentUser?.id) {
      throw new Error('로그인 된 유저의 정보가 잘못 되었습니다.');
    }

    const formattedProgram = Object.entries(data.createExerciseInfos).map(([day, exercises]) => ({
      day,
      exercises,
    }));

    const postedRoutine = await prisma.routine.create({
      data: {
        authorId: data.authorId,
        description: data.description ?? null,
        difficulty: data.difficulty ?? null,
        isPublic: data.isPublic,
        title: data.name,
        program: formattedProgram,
        devide: data.exerciseDevide ?? null,
        totalDays: data.totalDays,
        executeCount: 0,
        latestExecuteDate: null,
      },
    });

    return NextResponse.json({
      success: true,
      routineId: postedRoutine.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json('internal error', { status: 500 });
  }
}
