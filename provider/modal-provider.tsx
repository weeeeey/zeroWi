'use client';

import { ExercisesInfoModal, LoginModal, RoutineDetailModal } from '@/components/modal';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <ExercisesInfoModal />
      <RoutineDetailModal />
    </>
  );
}

export default ModalProvider;
