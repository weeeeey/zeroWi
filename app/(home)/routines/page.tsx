import { RoutineCardGroup, RoutineTitle } from '@/components/features/routines';
import { RoutineType } from '@/types/routine';
import { redirect } from 'next/navigation';

const ROUTINE_TYPES: RoutineType[] = ['latest', 'mine', 'shared', 'sharing', 'total'];

async function RoutinesPage({ searchParams }: { searchParams: Promise<{ type: RoutineType }> }) {
  const { type } = await searchParams;
  if (!ROUTINE_TYPES.includes(type)) {
    redirect('/routines?type=latest');
  }

  return (
    <div className="container">
      <RoutineTitle title={type} />
      {/* <RoutineCardGroup */}
    </div>
  );
}

export default RoutinesPage;
