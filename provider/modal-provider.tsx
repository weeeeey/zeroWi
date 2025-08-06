'use client';

import {
  ExercisesInfoModal,
  LoginModal,
  RecordDetailModal,
  RoutineDetailModal,
} from '@/components/modal';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <ExercisesInfoModal />
      <RoutineDetailModal />
      <RecordDetailModal />
    </>
  );
}

export default ModalProvider;
