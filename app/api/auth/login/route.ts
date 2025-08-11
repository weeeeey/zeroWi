import { getUserFromDatabase } from '@/lib/auth/oauth';
import { DeleteSessionsForPreviousBrowserId, createSessionAndSetCookie } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

/**
 * 사용자 로그인 및 세션 생성을 처리하는 API 라우트입니다.
 * OAuth 호스트로부터 받은 사용자 정보를 기반으로 데이터베이스에서 사용자를 조회하거나 생성하고,
 * 새로운 세션을 생성하여 쿠키에 설정합니다.
 *
 * @param {Request} req - Next.js Request 객체. 요청 본문에는 `browserId`와 `userInfoFromHost`가 포함됩니다.
 * @returns {Promise<NextResponse>} 성공 시 사용자 ID를 포함한 JSON 응답, 실패 시 에러 메시지를 포함한 JSON 응답.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { browserId, userInfoFromHost } = body;

    if (!browserId || !userInfoFromHost) {
      throw new Error('브라우저 식별자 또는 유저 정보가 잘못 됐습니다.');
    }
    const userId = await getUserFromDatabase(userInfoFromHost);

    await DeleteSessionsForPreviousBrowserId(browserId);
    await createSessionAndSetCookie(userId, browserId);

    const response = NextResponse.json({ success: true, userId });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
    return NextResponse.json('internal error', {
      status: 500,
    });
  }
}