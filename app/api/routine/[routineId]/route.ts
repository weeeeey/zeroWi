import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

interface DynamicParamsProps {
  params: Promise<{ routineId: string }>;
}
export async function GET(req: Request, { params }: DynamicParamsProps) {
  try {
    const { routineId } = await params;

    if (!routineId) {
      throw NextResponse.json('잘못된 접근', {
        status: 400,
      });
    }

    const routineDetail = await prisma.routine.findUnique({
      where: {
        id: routineId,
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
    // console.log(routineDetail);
    if (!routineDetail) {
      throw NextResponse.json('잘못된 접근', {
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      data: routineDetail,
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
