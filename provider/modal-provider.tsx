'use client';

import {
  ExercisesInfoModal,
  LoginModal,
  RecordDetailModal,
  RoutineDetailModal,
} from '@/components/modal';
import { Suspense } from 'react';

function ModalProvider() {
  return (
    <>
      <LoginModal />
      <ExercisesInfoModal />
      <Suspense>
        <RoutineDetailModal />
      </Suspense>
      <Suspense>
        <RecordDetailModal />
      </Suspense>
    </>
  );
}

export default ModalProvider;
