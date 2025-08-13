import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { RequestProgramFormData } from '@/types/program';
import { NextResponse } from 'next/server';

/**
 * 새로운 운동 프로그램을 생성하는 API 라우트입니다.
 * 요청 본문에서 프로그램 데이터를 받아 데이터베이스에 저장합니다.
 * 현재 로그인된 사용자의 권한을 확인합니다.
 *
 */
export async function POST(req: Request) {
  try {
    const data: RequestProgramFormData = await req.json();
    const currentUser = await getCurrentUser();

    if (data.authorId !== currentUser?.id) {
      throw new Error('로그인 된 유저의 정보가 잘못 되었습니다.');
    }

    const formattedRoutines = Object.entries(data.createExerciseInfos).map(([day, exercises]) => ({
      day,
      exercises,
    }));

    const postedProgram = await prisma.program.create({
      data: {
        authorId: data.authorId,
        description: data.description ?? null,
        difficulty: data.difficulty ?? null,
        isPublic: data.isPublic,
        title: data.name,
        routines: formattedRoutines,
        divide: data.exerciseDevide ?? null,
        totalDays: data.totalDays,
        executeCount: 0,
        latestExecuteDate: null,
      },
    });

    return NextResponse.json({
      success: true,
      programId: postedProgram.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json('internal error', { status: 500 });
  }
}
