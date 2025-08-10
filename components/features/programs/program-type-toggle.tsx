'use client';

import { PROGRAM_TITLE_KO, PROGRAM_TYPES } from '@/lib/programs/constant';
import { ProgramType } from '@/types/program';

interface ProgramTypeToggleProps {
  currentType: ProgramType;
  handleToggle: (value: ProgramType) => void;
}

function ProgramTypeToggle({ currentType, handleToggle }: ProgramTypeToggleProps) {
  return (
    <ul className="flex items-center space-x-1">
      {PROGRAM_TYPES.map((type, idx) => (
        <button
          key={idx}
          aria-label={`타입 토글 버튼-${type}`}
          onClick={() => handleToggle(type)}
          className={`cursor-pointer rounded-md px-2 py-1 text-sm text-nowrap text-white ${currentType === type ? 'bg-black font-semibold hover:bg-slate-700' : 'bg-slate-400 hover:bg-slate-500'}`}
        >
          {PROGRAM_TITLE_KO[type]}
        </button>
      ))}
    </ul>
  );
}

export default ProgramTypeToggle;
