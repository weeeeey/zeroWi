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
/**
 *
 * @param param0
 * @returns 루틴 아이디와 day를 삽입 하면 그 루틴의 day 운동 프로그램을 수행하고 기록하는 페이지
 */

export default async function RecordWorkoutPage({ params, searchParams }: RecordPageProps) {
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

  return <RecordContainer program={program} routineId={routineId} />;
}
