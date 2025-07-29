import { useModal } from '@/hooks/use-modal';

import ContainerModal from './container-modal';

function CreatorConfirmModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'CREATOR_CONFIRM';
  return (
    <ContainerModal modalOpen={modalOpen}>
      <section className="flex h-full items-center justify-center gap-y-4"></section>
    </ContainerModal>
  );
}

export default CreatorConfirmModal;
