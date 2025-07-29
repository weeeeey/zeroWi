'use client';

import { useModal } from '@/hooks/use-modal';

import { Dialog, DialogContent } from '../ui/dialog';

interface ContainerModalProps {
  modalOpen: boolean;
  children: React.ReactNode;
  widthRadio?: number;
  maxHeight?: string;
}

function ContainerModal({
  children,
  modalOpen,
  widthRadio = 0.8,
  maxHeight = '50vh',
}: ContainerModalProps) {
  const { onClose } = useModal();

  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-h-[${maxHeight}] min-h-52 w-full overflow-hidden p-0 max-w-[calc(var(--max-width)*${widthRadio})] `}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ContainerModal;
