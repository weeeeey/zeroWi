import { getTodayProgramFromRoutine } from '@/lib/record/server';

interface RecordDatePage {
  params: Promise<{
    routineId: string;
  }>;
  searchParams: Promise<{
    day: string;
  }>;
}

// href={`/record/${routine.id}?day=${selectDay}`}

async function RecordDatePage({ params, searchParams }: RecordDatePage) {
  const { routineId } = await params;
  let { day } = await searchParams;
  if (!day) {
    day = '1';
  }

  const program = await getTodayProgramFromRoutine(routineId, day);

  return <div className="h-full overflow-x-hidden"></div>;
}

export default RecordDatePage;
