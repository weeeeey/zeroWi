import { useModal } from '@/hooks/use-modal';

import { Dialog, DialogContent } from '../ui/dialog';

function ContainerModal({ children }: { children: React.ReactNode }) {
  const { modalType, isOpen, onClose } = useModal();
  if (modalType === 'LOGIN' && isOpen === true) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-(calc(--max-width)) max-h-">{children}</DialogContent>
      </Dialog>
    );
  }
}

export default ContainerModal;
