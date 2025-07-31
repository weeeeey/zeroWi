'use client';

import { ExercisesInfoModal, LoginModal } from '@/components/modal';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <ExercisesInfoModal />
    </>
  );
}

export default ModalProvider;
