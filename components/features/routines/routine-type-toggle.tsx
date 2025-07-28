'use client';

import { ROUTINE_TITLE_KO, ROUTINE_TYPES } from '@/lib/routines/constant';
import { RoutineType } from '@/types/routine';

interface RoutineTypeToggleProps {
  currentType: RoutineType;
  handleToggle: (value: RoutineType) => void;
}

function RoutineTypeToggle({ currentType, handleToggle }: RoutineTypeToggleProps) {
  return (
    <ul className="flex items-center space-x-1">
      {ROUTINE_TYPES.map((type, idx) => (
        <button
          key={idx}
          aria-label={`타입 토글 버튼-${type}`}
          onClick={() => handleToggle(type)}
          className={`cursor-pointer rounded-md px-2 py-1 text-sm text-nowrap text-white ${currentType === type ? 'bg-black font-semibold hover:bg-slate-700' : 'bg-slate-400 hover:bg-slate-500'}`}
        >
          {ROUTINE_TITLE_KO[type]}
        </button>
      ))}
    </ul>
  );
}

export default RoutineTypeToggle;
