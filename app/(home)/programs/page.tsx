'use client';

import {
  ProgramCardGroup,
  ProgramSortCriteriaSelect,
  ProgramTitle,
  ProgramTypeToggle,
} from '@/components/features/programs';
import { getConfigFromLocalStorage, setConfigToLocalStorage } from '@/lib/programs/storage';
import { ProgramSortCriteria, ProgramType } from '@/types/program';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';

type State = {
  type: ProgramType;
  sortCriteria: ProgramSortCriteria;
};

type Action =
  | { type: 'SET_TYPE'; payload: ProgramType }
  | { type: 'SET_SORT_CRITERIA'; payload: ProgramSortCriteria }
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

function ProgramsPage() {
  const [isMount, setIsMount] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    type: 'latestConduct',
    sortCriteria: 'latest',
  });

  useEffect(() => {
    setIsMount(true);
    if (typeof window !== 'undefined') {
      const query = getConfigFromLocalStorage();
      dispatch({ type: 'INITIALIZE', payload: query });
    }
  }, []);

  useEffect(() => {
    if (state.type && state.sortCriteria) {
      setConfigToLocalStorage(state.type, state.sortCriteria);
    }
  }, [state.type, state.sortCriteria]);

  if (!isMount || !state.type || !state.sortCriteria) return null;

  return (
    <div className="container space-y-6 px-0">
      <header className="sticky top-16 left-0 z-20 space-y-2 bg-slate-100 px-4 pb-4 shadow">
        <div className="flex items-start justify-between">
          <ProgramTitle title={state.type} />
          {/* 정렬 기준 셀렉 */}
          <ProgramSortCriteriaSelect
            currentCriteria={state.sortCriteria}
            handleSelect={(value) => dispatch({ type: 'SET_SORT_CRITERIA', payload: value })}
          />
        </div>
        {/* 루틴 종류 토글 */}
        <ProgramTypeToggle
          currentType={state.type}
          handleToggle={(value) => dispatch({ type: 'SET_TYPE', payload: value })}
        />
      </header>

      {/* 루틴들 */}

      <ProgramCardGroup programType={state.type} sortCriteria={state.sortCriteria} />

      {/* 루틴 생성 페이지 이동 버튼 */}
      <Link
        href="/programs/create"
        className="fixed bottom-6 left-1/2 z-10 translate-x-[calc(8rem+1px)] -translate-y-full rounded-full bg-blue-400 p-4 ring-1 ring-indigo-500 ring-offset-2 hover:bg-blue-500"
      >
        <Plus className="size-7 text-white" />
      </Link>
    </div>
  );
}

export default ProgramsPage;
