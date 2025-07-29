'use client';

import { dummyRoutines } from '@/dummy';
import { RoutineType } from '@/types/routine';

import RoutineCard from './routine-card';

interface RoutineCardGroupProps {
  type: RoutineType;
}

function RoutineCardGroup({ type }: RoutineCardGroupProps) {
  //   const { data } = useQuery({
  //   queryKey: ['routines', type],
  //   queryFn: () => fetchRoutines(type),
  //   suspense: true,
  // });
  const routines = dummyRoutines;

  // if (isLoading) return <RoutineCardGroupSkeleton />;
  // if (isError || !data) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
}

export default RoutineCardGroup;
