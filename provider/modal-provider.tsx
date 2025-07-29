'use client';

import { CreatorConfirmModal, ExercisesInfoModal, LoginModal } from '@/components/modal';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <CreatorConfirmModal />
      <ExercisesInfoModal />
    </>
  );
}

export default ModalProvider;
