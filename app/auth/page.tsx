import { LogoutButton } from '@/components/features/auth/logout-button';
import { OauthLoginButton } from '@/components/features/auth/oauth-login-button';
import { getCurrentUser } from '@/lib/auth';

async function AuthPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-4">
      <LogoutButton />
      {currentUser ? (
        <LogoutButton />
      ) : (
        <div className="space-y-4">
          <OauthLoginButton host="kakao" />
          <OauthLoginButton host="google" />
        </div>
      )}
    </div>
  );
}

export default AuthPage;
