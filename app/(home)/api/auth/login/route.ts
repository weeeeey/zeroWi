import { getUserFromDatabase } from '@/lib/auth/oauth';
import { DeleteSessionsForPreviousBrowserId, createSessionAndSetCookie } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

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
