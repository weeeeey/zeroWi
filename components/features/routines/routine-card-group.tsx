import { dummyRoutines } from '@/dummy';
import { RoutineType } from '@/types/routine';

import RoutineCard from './routine-card';

interface RoutineCardGroupProps {
  type: RoutineType;
}

function RoutineCardGroup({ type }: RoutineCardGroupProps) {
  const routines = dummyRoutines;

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
}

export default RoutineCardGroup;
