'use client';

import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';

function RecordModifyButton({ recordId }: { recordId: string }) {
  const router = useRouter();
  const handleClick = () => {
    const confirm = window.confirm('기록을 수정 하시겠습니다?');
    if (confirm) {
      router.push(`/record/modify/${recordId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-1/2 z-10 translate-x-[calc(8rem+1px)] -translate-y-full cursor-pointer rounded-full bg-black p-4 ring-1 ring-indigo-500 ring-offset-2 hover:bg-slate-700"
    >
      <SquarePen className="size-7 stroke-2 text-white" />
    </button>
  );
}

export default RecordModifyButton;
