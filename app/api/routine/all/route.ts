import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const routineType = searchParams.get('routineType');

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: '인증된 사용자만 접근할 수 있습니다.' },
        { status: 401 }
      );
    }

    let whereClause = {};

    if (routineType === 'shared') {
      whereClause = { isShared: true };
    } else if (routineType === 'mine') {
      whereClause = { authorId: currentUser.id };
    } else if (routineType === 'latestConduct') {
      whereClause = {
        authorId: currentUser.id,
        latestExecuteDate: {
          not: null,
        },
      };
    }

    const routines = await prisma.routine.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: routines,
    });
  } catch (error) {
    let message = '서버 에러';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({
      success: false,
      message,
    });
  }
}
