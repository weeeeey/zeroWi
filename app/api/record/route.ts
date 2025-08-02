import { getCurrentUser } from '@/lib/auth/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json('잘못된 사용자 접근입니다.', { status: 401 });
    }
    const recordId = 'asd';

    return NextResponse.json({
      success: true,
      data: recordId,
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
