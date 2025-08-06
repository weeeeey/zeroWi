import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// post get 은 server.ts에서 서버 액션으로 가져오게 함

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, content, authorId, category } = data;
    if (!title || !content || !authorId || !category) {
      return NextResponse.json(
        {
          success: false,
          message: '잘못된 데이터 요청',
        },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.id !== authorId) {
      return NextResponse.json(
        {
          success: false,
          message: '권한이 없는 유저',
        },
        { status: 401 }
      );
    }

    const createdPost = await prisma.post.create({
      data: {
        authorId,
        title,
        content,
        category,
      },
    });
    if (!createdPost) {
      return NextResponse.json(
        {
          success: false,
          message: '생성 실패',
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      postId: createdPost.id,
    });
  } catch (error) {
    let message = '서버 에러 발생';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
