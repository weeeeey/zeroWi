import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { RecordSubmitType } from '@/types/record';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: RecordSubmitType = await req.json();

    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json('잘못된 사용자 접근입니다.', { status: 401 });
    }

    const { records, routineId } = data;

    const postedRecord = await prisma.record.create({
      data: {
        records,
        userId: currentUser.id,
        routineId,
      },
    });

    return NextResponse.json({
      success: true,
      recordId: postedRecord.id,
    });
  } catch (error) {
    let message = 'internal error';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');

    if (!recordId) {
      return NextResponse.json(
        {
          success: false,
          message: 'recordId가 필요합니다.',
        },
        { status: 400 }
      );
    }

    const record = await prisma.record.findUnique({
      where: {
        id: recordId,
      },
    });

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: '레코드를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }
    const { records } = record;

    return NextResponse.json({
      success: true,
      records,
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
