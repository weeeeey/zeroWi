import { OauthLoginButton } from '../features/auth/oauth-login-button';
import ContainerModal from './container-modal';

function LoginModal() {
  return (
    <ContainerModal>
      <section className="flex h-full items-center justify-center gap-y-4">
        <ul className="space-y-4">
          <OauthLoginButton host="kakao" />
          <OauthLoginButton host="google" />
        </ul>
      </section>
    </ContainerModal>
  );
}

export default LoginModal;
