import { getCurrentUser } from '@/lib/auth/server';
import { RequestRoutineFormData } from '@/types/routine';
import { NextResponse } from 'next/server';

// 루틴 생성 api
export async function POST(req: Request) {
  try {
    const data: RequestRoutineFormData = await req.json();
    const currentUser = await getCurrentUser();
    if (data.authorId !== currentUser?.id) {
      throw new Error('로그인 된 유저의 정보가 잘못 되었습니다.');
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 401 });
    }
    return NextResponse.json('internal error', { status: 500 });
  }
}
