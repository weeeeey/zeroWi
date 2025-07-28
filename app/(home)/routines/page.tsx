'use client';

import {
  RoutineCardGroup,
  RoutineSortCriteriaSelect,
  RoutineTitle,
  RoutineTypeToggle,
} from '@/components/features/routines';
import { getConfigFromLocalStorage, setConfigToLocalStorage } from '@/lib/routines/storage';
import { RoutineSortCriteria, RoutineType } from '@/types/routine';
import { useEffect, useReducer, useState } from 'react';

type State = {
  type: RoutineType;
  sortCriteria: RoutineSortCriteria;
};

type Action =
  | { type: 'SET_TYPE'; payload: RoutineType }
  | { type: 'SET_SORT_CRITERIA'; payload: RoutineSortCriteria }
  | { type: 'INITIALIZE'; payload: State };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    case 'SET_SORT_CRITERIA':
      return { ...state, sortCriteria: action.payload };
    case 'INITIALIZE':
      return action.payload;
    default:
      return state;
  }
};

function RoutinesPage() {
  const [isMount, setIsMount] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    type: 'latest',
    sortCriteria: 'latest',
  });

  useEffect(() => {
    setIsMount(true);
    if (typeof window !== 'undefined') {
      const query = getConfigFromLocalStorage();
      if (query) {
        dispatch({ type: 'INITIALIZE', payload: query });
      }
    }
  }, []);

  useEffect(() => {
    if (state.type && state.sortCriteria) {
      setConfigToLocalStorage(state.type, state.sortCriteria);
    }
  }, [state.type, state.sortCriteria]);

  if (!isMount || !state.type || !state.sortCriteria) return null;

  return (
    <div className="container space-y-6">
      <header className="flex items-start justify-between">
        <RoutineTitle title={state.type} />
        <RoutineSortCriteriaSelect
          currentCriteria={state.sortCriteria}
          handleSelect={(value) => dispatch({ type: 'SET_SORT_CRITERIA', payload: value })}
        />
      </header>

      <RoutineTypeToggle
        currentType={state.type}
        handleToggle={(value) => dispatch({ type: 'SET_TYPE', payload: value })}
      />

      <RoutineCardGroup type={state.type} />
    </div>
  );
}

export default RoutinesPage;
