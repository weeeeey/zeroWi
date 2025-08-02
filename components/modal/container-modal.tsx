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

  if (!modalOpen) return null;
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent
        className={`min-h-52 w-full overflow-hidden p-0`}
        style={{
          width: `calc(var(--max-width) * ${widthRadio})`,
          maxHeight,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ContainerModal;
