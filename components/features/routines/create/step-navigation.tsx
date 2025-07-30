import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: StepNavigationProps) => {
  return (
    <div className="mb-2 flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex cursor-pointer items-center space-x-2 border-gray-200 bg-white disabled:text-slate-300"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>이전</span>
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 disabled:text-slate-300"
      >
        <span>다음</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
