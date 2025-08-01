'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ToastVariant = 'default' | 'danger' | 'success';

type ToastProps = {
  id: number;
  message: string;
  description?: string;
  variant: ToastVariant;
};

let toastId = 0;
let toastCallback: (toast: ToastProps) => void;

export const toast = (
  message: string,
  options?: {
    description?: string;
    duration?: number;
    variant?: ToastVariant;
  }
) => {
  toastId++;
  toastCallback?.({
    id: toastId,
    message,
    description: options?.description,
    variant: options?.variant ?? 'default',
  });

  setTimeout(() => {
    toastCallback?.({
      id: -toastId,
      message: '',
      variant: 'default',
    });
  }, options?.duration ?? 4000);
};

export default function CustomToaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    toastCallback = (toast) => {
      if (toast.id < 0) {
        setToasts((prev) => prev.filter((t) => t.id !== -toast.id));
      } else {
        setToasts((prev) => [...prev, toast]);
      }
    };
  }, []);

  const getVariantClass = (variant: ToastVariant) => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-700 border border-red-400';
      case 'success':
        return 'bg-slate-50 text-blue-700 border border-blue-400';
      case 'default':
      default:
        return 'bg-white text-black border border-zinc-200 shadow-sm'; // shadcn UI 뉴욕 스타일 참고
    }
  };

  return (
    <div className="fixed top-[30vh] left-1/2 z-[9999] w-[calc(var(--max-width,420px)*0.8)] -translate-x-1/2 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`w-full rounded-md p-4 ${getVariantClass(toast.variant)}`}
          >
            <div className="text-sm font-medium">{toast.message}</div>
            {toast.description && (
              <div className="mt-1 text-xs opacity-80">{toast.description}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
