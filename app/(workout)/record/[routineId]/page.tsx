import RecordContainer from '@/components/features/record/record-container';
import { getTodayProgramFromRoutine } from '@/lib/record/server';
import Link from 'next/link';

interface RecordPageProps {
  params: Promise<{
    routineId: string;
  }>;
  searchParams: Promise<{
    day: string;
  }>;
}

// href={`/record/${routine.id}?day=${selectDay}`}

export default async function RecordPage({ params, searchParams }: RecordPageProps) {
  const { routineId } = await params;
  let { day } = await searchParams;
  if (!day) {
    day = '1';
  }

  const program = await getTodayProgramFromRoutine(routineId, day);
  if (!program) {
    return (
      <div className="flex h-full items-center justify-center overflow-x-hidden">
        <h2>오늘은 휴식데이</h2>
        <Link href="routines">다른 루틴 보러가기</Link>
      </div>
    );
  }

  return <RecordContainer program={program} />;
}
