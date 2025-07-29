import { useModal } from '@/hooks/use-modal';

import ContainerModal from './container-modal';

const MAX_HEIGHT = '70vh';

function CreatorConfirmModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'CREATOR_CONFIRM';
  return (
    <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
      <section className={`max-h-[${MAX_HEIGHT}] scroll-m-0 space-y-4 overflow-y-scroll`}>
        <div className="h-32 w-full bg-black" />
        <div className="h-32 w-full bg-black" />
        <div className="h-32 w-full bg-black" />
        <div className="h-32 w-full bg-black" />
        <div className="h-32 w-full bg-black" />
        <div className="h-32 w-full bg-black" />
      </section>
    </ContainerModal>
  );
}

export default CreatorConfirmModal;
