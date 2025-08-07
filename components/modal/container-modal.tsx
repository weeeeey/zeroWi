'use client';

import { useModal } from '@/hooks/use-modal';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

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
        {/* Use VisuallyHidden to hide the title visually but keep it accessible */}
        <VisuallyHidden asChild>
          {/* <h2 className="text-lg font-semibold">My Hidden Dialog Title</h2> */}
          <DialogTitle />
        </VisuallyHidden>

        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ContainerModal;
