import { getAccessTokenFromHostServer, getUserInfoFromHostServer, isValidHost } from '@/lib/auth';
import { AuthHostType, OAuthHostType } from '@/types/auth';
import Image from 'next/image';

interface OAuthHostPage {
  params: Promise<{
    host: string;
  }>;
  searchParams: Promise<{
    code?: string;
  }>;
}

async function OAuthHostPage({ params, searchParams }: OAuthHostPage) {
  const { host } = await params;
  const { code } = await searchParams;
  if (!isValidHost(host) || !code) throw new Error('로그인 과정에서 에러가 발생했습니다');

  const accessToken = await getAccessTokenFromHostServer(host as OAuthHostType, code);
  const userInfo = await getUserInfoFromHostServer(accessToken, host as AuthHostType);

  return <div className="container"></div>;
}

export default OAuthHostPage;
