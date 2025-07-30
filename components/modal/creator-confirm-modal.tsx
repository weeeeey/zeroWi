import { useModal } from '@/hooks/use-modal';

import ContainerModal from './container-modal';

const MAX_HEIGHT = '70vh';

function CreatorConfirmModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'CREATOR_CONFIRM';
  return (
    <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
      <section
        style={{
          maxHeight: MAX_HEIGHT,
        }}
        className={`space-y-4 overflow-y-scroll`}
      ></section>
    </ContainerModal>
  );
}

export default CreatorConfirmModal;
