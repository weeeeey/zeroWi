'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

function OpenExerciseInfoButton({
  className,
  iconSize,
}: {
  iconSize?: string;
  className?: string;
}) {
  const { onOpen } = useModal();
  return (
    <Button
      type="button"
      onClick={() => onOpen('EXERCISES_INFO')}
      className={cn('size-full bg-gradient-to-r from-blue-500 to-indigo-600', className)}
    >
      <Plus className={cn('mr-1 h-4 w-4', iconSize)} />
      운동 추가
    </Button>
  );
}

export default OpenExerciseInfoButton;
