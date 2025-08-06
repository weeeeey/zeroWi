'use client';

import { useModal } from '@/hooks/use-modal';

export default function RecordList() {
  const { onOpen } = useModal();

  return (
    <div className="h-full pb-32">
      <button onClick={() => onOpen('RECORD_DETAIL')}>zmffl</button>
    </div>
  );
}
