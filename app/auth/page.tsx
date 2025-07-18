import { OauthLoginButton } from '@/components/pages/auth/oauth-login-button';

function AuthPage() {
  return (
    <div className="space-y-4">
      <OauthLoginButton host="kakao" />
      <OauthLoginButton host="google" />
    </div>
  );
}

export default AuthPage;
