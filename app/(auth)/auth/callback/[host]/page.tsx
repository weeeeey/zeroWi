import HandleAuthInClient from '@/components/features/auth/handle-auth-in-client';
import {
  getAccessTokenFromHostServer,
  getUserInfoFromHostServer,
  isValidHost,
} from '@/lib/auth/oauth';
import { getCurrentUser } from '@/lib/auth/server';
import { AuthHostType, OAuthHostType } from '@/types/auth';
import { redirect } from 'next/navigation';

interface OAuthHostPage {
  params: Promise<{
    host: string;
  }>;
  searchParams: Promise<{
    code?: string;
  }>;
}

async function OAuthHostPage({ params, searchParams }: OAuthHostPage) {
  const currentUser = await getCurrentUser();
  if (currentUser?.id) redirect('/');
  const { host } = await params;
  const { code } = await searchParams;
  if (!isValidHost(host) || !code) throw new Error('로그인 과정에서 에러가 발생했습니다');
  const accessToken = await getAccessTokenFromHostServer(host as OAuthHostType, code);
  const userInfoFromHost = await getUserInfoFromHostServer(accessToken, host as AuthHostType);

  return (
    <>
      <HandleAuthInClient userInfoFromHost={userInfoFromHost} />
    </>
  );
}

export default OAuthHostPage;
