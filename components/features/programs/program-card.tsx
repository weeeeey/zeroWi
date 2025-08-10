'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/custom-toaster';
import DropDown from '@/components/ui/drop-down';
import { useModal } from '@/hooks/use-modal';
import { PROGRAM_DIFFICULT_COLOR, SEARCHPARAM_PROGRAMID } from '@/lib/programs/constant';
import { Program } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarDays, Clock, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 *
 * @param param0
 * 카드 클릭시 디테일 모달 오픈 시키기
 * @returns
 */

export default function ProgramCard({ program }: { program: Program }) {
  const { onOpen } = useModal();
  const router = useRouter();

  const handleOpenProgramDetailModal = useCallback(() => {
    onOpen('PROGRAM_DETAIL');

    const newSearchParams = new URLSearchParams();
    newSearchParams.set(SEARCHPARAM_PROGRAMID, program.id);
    router.replace(`?${newSearchParams.toString()}`);
  }, [onOpen, router, program.id]);

  return (
    <Card key={program.id} className="h-72 border-none p-0 shadow-sm">
      {program.difficulty && (
        <div
          className={`${PROGRAM_DIFFICULT_COLOR[program.difficulty]} mt-4 ml-2 inline-block w-12 rounded-full px-2 py-1 text-xs font-medium text-white`}
        >
          {program.difficulty}
        </div>
      )}

      <CardContent className="flex flex-col p-4 pt-0">
        <div className="mb-4 space-y-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-2xl font-semibold text-gray-900">{program.title}</h3>
            <ProgramCardDropdown
              programId={program.id}
              handleOpenProgramDetailModal={handleOpenProgramDetailModal}
            />
          </div>
          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {program.executeCount}회 수행
            </div>

            {program.latestExecuteDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {format(program.latestExecuteDate, 'yy.MM.dd')}
              </div>
            )}
          </div>
          <p className="h-16 truncate rounded-md bg-slate-100 px-2 py-1 text-sm text-wrap text-slate-600">
            {program.description}
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenProgramDetailModal}
          className="cursor-pointer rounded-xl bg-blue-500 py-2 text-center font-semibold text-white hover:bg-blue-600"
        >
          상세 보기
        </button>
      </CardContent>
    </Card>
  );
}

function ProgramCardDropdown({
  programId,
  handleOpenProgramDetailModal,
}: {
  programId: string;
  handleOpenProgramDetailModal: () => void;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/program/${programId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        router.refresh();
        return;
      }
      throw new Error('에러 발생');
    } catch {
      toast('삭제 중 오류가 발생했습니다.', {
        variant: 'danger',
      });
    }
  };

  return (
    <DropDown
      trigger={({ onClick }) => (
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClick}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}
      items={[
        { text: '운동 정보', onClick: () => handleOpenProgramDetailModal() },
        { text: '수정', onClick: () => alert('프로그램 수정') },
        { text: '삭제', onClick: handleDelete, danger: true },
      ]}
    />
  );
}
