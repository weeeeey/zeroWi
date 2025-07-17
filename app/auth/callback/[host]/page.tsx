import { AuthHost } from '@/types/auth';

interface AuthHostPage {
  params: Promise<{
    host: AuthHost;
  }>;
}

async function AuthHostPage({ params }: AuthHostPage) {
  const { host } = await params;
  return <div>AuthHostPage</div>;
}

export default AuthHostPage;
