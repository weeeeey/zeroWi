'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTINE_SORT_CRITERIAS, ROUTINE_SORT_CRITERIAS_KO } from '@/lib/routines/constant';
import { RoutineSortCriteria } from '@/types/routine';

interface RoutineSortCriteriaSelectProps {
  currentCriteria: RoutineSortCriteria;
  handleSelect: (value: RoutineSortCriteria) => void;
}

function RoutineSortCriteriaSelect({
  currentCriteria,
  handleSelect,
}: RoutineSortCriteriaSelectProps) {
  return (
    <Select onValueChange={handleSelect} value={currentCriteria}>
      <SelectTrigger className="border-2 bg-white font-semibold select-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROUTINE_SORT_CRITERIAS.map((content, idx) => (
          <SelectItem key={idx} value={content}>
            {ROUTINE_SORT_CRITERIAS_KO[content]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RoutineSortCriteriaSelect;
