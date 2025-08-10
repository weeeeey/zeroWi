'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROGRAM_SORT_CRITERIAS, PROGRAM_SORT_CRITERIAS_KO } from '@/lib/programs/constant';
import { ProgramSortCriteria } from '@/types/program';

interface ProgramSortCriteriaSelectProps {
  currentCriteria: ProgramSortCriteria;
  handleSelect: (value: ProgramSortCriteria) => void;
}

function ProgramSortCriteriaSelect({
  currentCriteria,
  handleSelect,
}: ProgramSortCriteriaSelectProps) {
  return (
    <Select onValueChange={handleSelect} value={currentCriteria}>
      <SelectTrigger className="border-2 bg-white font-semibold select-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-24 min-w-0">
        {PROGRAM_SORT_CRITERIAS.map((content, idx) => (
          <SelectItem key={idx} value={content}>
            {PROGRAM_SORT_CRITERIAS_KO[content]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProgramSortCriteriaSelect;
