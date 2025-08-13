import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * 다양한 필터링 조건에 따라 프로그램 목록을 조회하는 API 라우트입니다.
 * 인증된 사용자만 접근할 수 있으며, `programType` 쿼리 파라미터에 따라 필터링됩니다.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const programType = searchParams.get('programType');

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: '인증된 사용자만 접근할 수 있습니다.' },
        { status: 401 }
      );
    }

    let whereClause = {};

    if (programType === 'shared') {
      whereClause = { isShared: true };
    } else if (programType === 'mine') {
      whereClause = { authorId: currentUser.id };
    } else if (programType === 'latestConduct') {
      whereClause = {
        authorId: currentUser.id,
        latestExecuteDate: {
          not: null,
        },
      };
    }

    const programs = await prisma.program.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: programs,
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
