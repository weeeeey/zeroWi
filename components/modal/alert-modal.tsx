'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  description: string;
  children?: React.ReactNode;
}

export function AlertModal({ title, description, children, onClose, isOpen }: AlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        className="h-44"
        style={{
          width: `calc(var(--max-width) * ${0.8})`,
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}></AlertDialogAction> */}
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
