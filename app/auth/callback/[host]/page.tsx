import { URL_ORIGIN } from '@/lib/auth/constants';
import {
  getAccessTokenFromHostServer,
  getUserFromDatabase,
  getUserInfoFromHostServer,
  isValidHost,
} from '@/lib/auth/oauth';
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

const endPoint =
  process.env.NODE_ENV === 'development' ? process.env.DEVELOP_URL : process.env.DEPLOY_URL;

async function OAuthHostPage({ params, searchParams }: OAuthHostPage) {
  const { host } = await params;
  const { code } = await searchParams;
  if (!isValidHost(host) || !code) throw new Error('로그인 과정에서 에러가 발생했습니다');
  const accessToken = await getAccessTokenFromHostServer(host as OAuthHostType, code);
  const userInfoFromHost = await getUserInfoFromHostServer(accessToken, host as AuthHostType);

  const res = await fetch(`${endPoint}/api/auth`, {
    method: 'POST',
    body: JSON.stringify({
      ...userInfoFromHost,
      host,
    }),
  });
  if (res.status !== 200) {
    throw new Error('error 발생');
  }
  redirect('/auth/redirect');

  return <div className="container"></div>;
}

export default OAuthHostPage;
