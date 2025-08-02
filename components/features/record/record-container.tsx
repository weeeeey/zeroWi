'use client';

import { CreateRoutineExercise } from '@/hooks/use-add-exercise-routine';

import RecordFooter from './record-footer';
import RecordHeader from './record-header';
import RecordMain from './record-main';

function RecordContainer({ program }: { program: CreateRoutineExercise[] }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col outline-1">
      <RecordHeader />
      <div className="flex-1 bg-slate-100">
        <RecordMain />
      </div>
      <RecordFooter />
    </div>
  );
}

export default RecordContainer;
