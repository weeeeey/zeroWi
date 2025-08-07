'use client';

import { fetchRoutines } from '@/lib/routines/server';
import { cn } from '@/lib/utils';
import { RoutineSortCriteria, RoutineType } from '@/types/routine';
import { useQuery } from '@tanstack/react-query';

import RoutineCard from './routine-card';
import RoutineCardGroupSkeleton from './routine-card-group-skeleton';

interface RoutineCardGroupProps {
  routineType: RoutineType;
  sortCriteria: RoutineSortCriteria;
}

function RoutineCardGroup({ routineType, sortCriteria }: RoutineCardGroupProps) {
  const {
    data: routines,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['routines', routineType],
    queryFn: () => fetchRoutines(routineType),
  });

  if (isError) {
    throw new Error('서버 에러');
  }
  if (isLoading) {
    return (
      <div className="space-y-4">
        <RoutineCardGroupSkeleton />
      </div>
    );
  }

  if (!routines || routines?.length === 0) {
    return (
      <div className="flex h-[55vh] w-full items-center justify-center rounded-xl bg-white text-3xl font-bold text-blue-500">
        <div>루틴이 없습니다</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col space-y-4', sortCriteria === 'latest' && 'flex-col-reverse')}>
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
}

export default RoutineCardGroup;
