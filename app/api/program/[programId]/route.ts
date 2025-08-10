import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

interface DynamicParamsProps {
  params: Promise<{ programId: string }>;
}
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
