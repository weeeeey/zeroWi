'use client';

import {
  ExercisesInfoModal,
  LoginModal,
  RecordDetailModal,
  ProgramDetailModal,
} from '@/components/modal';
import { Suspense } from 'react';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <ExercisesInfoModal />
      <Suspense>
        <ProgramDetailModal />
      </Suspense>
      <Suspense>
        <RecordDetailModal />
      </Suspense>
    </>
  );
}

export default ModalProvider;
