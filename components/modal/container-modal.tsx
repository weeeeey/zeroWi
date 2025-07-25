'use client';

import { useModal } from '@/hooks/use-modal';

import { Dialog, DialogContent } from '../ui/dialog';

function ContainerModal({ children }: { children: React.ReactNode }) {
  const { modalType, isOpen, onClose } = useModal();
  if (modalType === 'LOGIN' && isOpen === true) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-72 min-h-52 w-full max-w-[calc(var(--max-width)*0.8)]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}

export default ContainerModal;
