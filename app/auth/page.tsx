import { OauthLoginButton } from '@/components/pages/auth/oauth-login-button';
import Image from 'next/image';

function AuthPage() {
  return (
    <div className="space-y-4">
      <KakaoButton />
      <GoogleButton />
    </div>
  );
}

function KakaoButton() {
  return (
    <OauthLoginButton className="bg-yellow-400">
      <div className="relative size-8">
        <Image src={'/images/kakao-logo.svg'} className="absolute" fill alt="카카오 로그인 버튼" />
      </div>
      <span className="font-bold">카카오 로그인</span>
    </OauthLoginButton>
  );
}
function GoogleButton() {
  return (
    <OauthLoginButton className="bg-slate-100 outline-2">
      <div className="relative size-8">
        <Image src={'/images/google-logo.svg'} className="absolute" fill alt="카카오 로그인 버튼" />
      </div>
      <span className="font-bold">구글 로그인</span>
    </OauthLoginButton>
  );
}

export default AuthPage;
