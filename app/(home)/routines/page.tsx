'use client';

import {
  RoutineCardGroup,
  RoutineSortCriteriaSelect,
  RoutineTitle,
  RoutineTypeToggle,
} from '@/components/features/routines';
import { RoutineSortCriteria, RoutineType } from '@/types/routine';
import { useCallback, useState } from 'react';

function RoutinesPage() {
  const [type, setType] = useState<RoutineType>('latest');
  const [sortCriteria, setSortCriteria] = useState<RoutineSortCriteria>('latest');

  const handleSelctSortCriteria = useCallback((value: RoutineSortCriteria) => {
    setSortCriteria(value);
  }, []);
  const handleToggleType = useCallback((value: RoutineType) => {
    setType(value);
  }, []);

  return (
    <div className="container space-y-6">
      <header className="flex items-start justify-between">
        <RoutineTitle title={type} />
        <RoutineSortCriteriaSelect
          currentCriteria={sortCriteria}
          handleSelect={handleSelctSortCriteria}
        />
      </header>

      <RoutineTypeToggle currentType={type} handleToggle={handleToggleType} />

      <RoutineCardGroup type={type} />
    </div>
  );
}

export default RoutinesPage;
