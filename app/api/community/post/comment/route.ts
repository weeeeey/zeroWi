import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content, postId, authorId } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    let message = '댓글 등록 실패';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { commentId, content } = await req.json();

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    let message = '댓글 수정 실패';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { commentId } = await req.json();

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let message = '댓글 삭제 실패';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
