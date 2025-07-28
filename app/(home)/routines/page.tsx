'use client';

import {
  RoutineCardGroup,
  RoutineSortCriteriaSelect,
  RoutineTitle,
  RoutineTypeToggle,
} from '@/components/features/routines';
import { getConfigFromLocalStorage, setConfigToLocalStorage } from '@/lib/routines/storage';
import { RoutineSortCriteria, RoutineType } from '@/types/routine';
import { useCallback, useEffect, useState } from 'react';

function RoutinesPage() {
  const [isMount, setIsMount] = useState(false);
  const [type, setType] = useState<RoutineType>();
  const [sortCriteria, setSortCriteria] = useState<RoutineSortCriteria>();

  const handleSelctSortCriteria = useCallback((value: RoutineSortCriteria) => {
    setSortCriteria(value);
  }, []);
  const handleToggleType = useCallback((value: RoutineType) => {
    setType(value);
  }, []);

  useEffect(() => {
    setIsMount(true);
    let initType: RoutineType = 'latest';
    let initCriteria: RoutineSortCriteria = 'latest';
    if (window) {
      const query = getConfigFromLocalStorage();
      if (query) {
        initType = query.type;
        initCriteria = query.sortCriteria;
      }
    }
    setType(initType);
    setSortCriteria(initCriteria);
  }, []);

  useEffect(() => {
    if (type && sortCriteria) {
      setConfigToLocalStorage(type, sortCriteria);
    }
  }, [type, sortCriteria]);

  if (!isMount || !type || !sortCriteria) return null;

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
