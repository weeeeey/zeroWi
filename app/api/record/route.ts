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
