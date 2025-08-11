import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * 동적 라우트 파라미터의 타입을 정의합니다.
 */
interface DynamicParamsProps {
  params: Promise<{ programId: string }>;
}

/**
 * 특정 ID를 가진 운동 프로그램의 상세 정보를 조회하는 API 라우트입니다.
 *
 * @param {Request} req - Next.js Request 객체.
 * @param {DynamicParamsProps} { params } - 동적 라우트 파라미터 (programId 포함).
 * @returns {Promise<NextResponse>} 성공 시 프로그램 상세 정보를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
export async function GET(req: Request, { params }: DynamicParamsProps) {
  try {
    const { programId } = await params;

    if (!programId) {
      throw NextResponse.json('잘못된 접근', {
        status: 400,
      });
    }

    const programDetail = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        author: {
          select: {
            name: true,
            picture: true,
            id: true,
          },
        },
      },
    });
    // console.log(programDetail);
    if (!programDetail) {
      throw NextResponse.json('잘못된 접근', {
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      data: programDetail,
    });
  } catch (error) {
    let message = 'internal error';
    let status = 500;
    if (error instanceof Error) {
      message = error.message;
      status = 400;
    }
    return NextResponse.json(
      {
        message,
      },
      {
        status,
      }
    );
  }
}

/**
 * 특정 ID를 가진 운동 프로그램을 삭제하는 API 라우트입니다.
 *
 * @param {Request} req - Next.js Request 객체.
 * @param {DynamicParamsProps} { params } - 동적 라우트 파라미터 (programId 포함).
 * @returns {Promise<NextResponse>} 성공 시 성공 메시지를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
export async function DELETE(req: Request, { params }: DynamicParamsProps) {
  try {
    const { programId } = await params;

    if (!programId) {
      return NextResponse.json({ success: false, message: '잘못된 접근' }, { status: 400 });
    }

    await prisma.program.delete({
      where: { id: programId },
    });

    return NextResponse.json({ success: true, message: '프로그램이 삭제되었습니다.' });
  } catch (error) {
    let message = 'internal error';
    let status = 500;
    if (error instanceof Error) {
      message = error.message;
      status = 400;
    }
    return NextResponse.json({ success: false, message }, { status });
  }
}