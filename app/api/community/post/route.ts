import { getCurrentUser } from '@/lib/auth/server';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// post get 은 server.ts에서 서버 액션으로 가져오게 함

/**
 * 새로운 커뮤니티 게시물을 생성하는 API 라우트입니다.
 * 게시물 제목, 내용, 작성자 ID, 카테고리를 받아 데이터베이스에 저장합니다.
 * 현재 로그인된 사용자의 권한을 확인합니다.
 *
 * @param {Request} req - Next.js Request 객체. 요청 본문에는 `title`, `content`, `authorId`, `category`가 포함됩니다.
 * @returns {Promise<NextResponse>} 성공 시 게시물 ID를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
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