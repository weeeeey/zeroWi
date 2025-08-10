'use client';

import { fetchPrograms } from '@/lib/programs/server';
import { cn } from '@/lib/utils';
import { ProgramSortCriteria, ProgramType } from '@/types/program';
import { useQuery } from '@tanstack/react-query';

import ProgramCard from './program-card';
import ProgramCardGroupSkeleton from './program-card-group-skeleton';

interface ProgramCardGroupProps {
  programType: ProgramType;
  sortCriteria: ProgramSortCriteria;
}

function ProgramCardGroup({ programType, sortCriteria }: ProgramCardGroupProps) {
  const {
    data: programs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['programs', programType],
    queryFn: () => fetchPrograms(programType),
  });

  if (isError) {
    throw new Error('서버 에러');
  }
  if (isLoading) {
    return (
      <div className="space-y-4">
        <ProgramCardGroupSkeleton />
      </div>
    );
  }

  if (!programs || programs?.length === 0) {
    return (
      <div className="flex h-[55vh] w-full items-center justify-center rounded-xl bg-white text-3xl font-bold text-blue-500">
        <div>프로그램이 없습니다</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col space-y-4', sortCriteria === 'latest' && 'flex-col-reverse')}>
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}

export default ProgramCardGroup;
