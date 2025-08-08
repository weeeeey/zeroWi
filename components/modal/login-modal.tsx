import { useModal } from '@/hooks/use-modal';

import { OauthLoginButtons } from '../features/auth/oauth-login-buttons';
import ContainerModal from './container-modal';

function LoginModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'LOGIN';

  return (
    <ContainerModal modalOpen={modalOpen}>
      <section className="flex h-full items-center justify-center gap-y-4">
        <OauthLoginButtons />
      </section>
    </ContainerModal>
  );
}

export default LoginModal;
