import RecordContainer from '@/components/features/record/record-container';
import { getTodayProgramFromProgram } from '@/lib/record/server';
import Link from 'next/link';

interface RecordPageProps {
  params: Promise<{
    programId: string;
  }>;
  searchParams: Promise<{
    day: string;
  }>;
}

// href={`/record/${program.id}?day=${selectDay}`}
/**
 *
 * @param param0
 * @returns 프로그램 아이디와 day를 삽입 하면 그 프로그램의 day 운동 프로그램을 수행하고 기록하는 페이지
 */

export default async function RecordWorkoutPage({ params, searchParams }: RecordPageProps) {
  const { programId } = await params;
  let { day } = await searchParams;
  if (!day) {
    day = '1';
  }

  const program = await getTodayProgramFromProgram(programId, day);
  if (!program) {
    return (
      <div className="flex h-full items-center justify-center overflow-x-hidden">
        <h2>오늘은 휴식데이</h2>
        <Link href="/programs">다른 프로그램 보러가기</Link>
      </div>
    );
  }

  return <RecordContainer program={program} programId={programId} />;
}
