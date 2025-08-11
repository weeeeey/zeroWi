import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { RecordSubmitType } from '@/types/record';
import { NextResponse } from 'next/server';

/**
 * 새로운 운동 기록을 생성하는 API 라우트입니다.
 * 요청 본문에서 운동 기록 데이터를 받아 데이터베이스에 저장합니다.
 * 현재 로그인된 사용자의 권한을 확인합니다.
 *
 * @param {Request} req - Next.js Request 객체. 요청 본문에는 `RecordSubmitType` 타입의 데이터가 포함됩니다.
 * @returns {Promise<NextResponse>} 성공 시 `recordId`를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
export async function POST(req: Request) {
  try {
    const data: RecordSubmitType = await req.json();

    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json('잘못된 사용자 접근입니다.', { status: 401 });
    }

    const { records, programId } = data;

    const postedRecord = await prisma.record.create({
      data: {
        records,
        userId: currentUser.id,
        programId,
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

/**
 * 특정 운동 기록을 조회하는 API 라우트입니다.
 * `recordId` 쿼리 파라미터를 사용하여 기록을 조회합니다.
 *
 * @param {Request} req - Next.js Request 객체. `recordId` 쿼리 파라미터를 포함해야 합니다.
 * @returns {Promise<NextResponse>} 성공 시 기록 데이터를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
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