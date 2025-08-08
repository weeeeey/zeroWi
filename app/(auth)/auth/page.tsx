import { OauthLoginButtons } from '@/components/features/auth/oauth-login-buttons';
import { getCurrentUser } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

async function SignInPage() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect('/');
  }

  return (
    <section className="flex h-screen items-center justify-center bg-black">
      <OauthLoginButtons />
    </section>
  );
}

export default SignInPage;
