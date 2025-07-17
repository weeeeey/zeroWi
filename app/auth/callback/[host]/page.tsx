import { isValidHost } from '@/lib/auth';

interface AuthHostPage {
  params: Promise<{
    host: string;
  }>;
}

async function AuthHostPage({ params }: AuthHostPage) {
  const { host } = await params;
  if (!isValidHost(host)) throw new Error('로그인 과정에서 에러가 발생했습니다');
  return <div>{host}</div>;
}

export default AuthHostPage;
