import { cn } from '@/lib/utils';

interface SectionModalProps {
  children: React.ReactNode;
  className?: string;

  maxHeight?: string;
}

function SectionModal({ maxHeight, children, className }: SectionModalProps) {
  return (
    <section
      style={{
        maxHeight: maxHeight,
      }}
      className={cn('space-y-4', className)}
    >
      {children}
    </section>
  );
}

export default SectionModal;
