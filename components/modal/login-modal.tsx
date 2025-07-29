import { useModal } from '@/hooks/use-modal';

import { OauthLoginButton } from '../features/auth/oauth-login-button';
import ContainerModal from './container-modal';

function LoginModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'LOGIN';
  return (
    <ContainerModal modalOpen={modalOpen}>
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
