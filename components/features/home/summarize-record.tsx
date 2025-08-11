'use client';

import { dummyDayStats } from '@/dummy';
import { useModal } from '@/hooks/use-modal';
import { ChevronRight, Clock } from 'lucide-react';
import { memo } from 'react';

import StatCard from './stat-card';

/**
 *
 * 선택 된 day의 운동 기록을 간략하게 보여주는 컴포넌트이다.
 * 1.그 날 했던 각 운동들의 총 세트와 평균 중량을 한 줄로 보여줌
 * 2. 그 날의 총 세트, 총 중량을 보여줌
 * @param param0
 * @returns
 */

function SummarizeRecord({
  profileId,
  day,
  recordId,
}: {
  profileId: string;
  day: Date;
  recordId: string;
}) {
  const { onOpen } = useModal();

  const openRecordDetailModal = () => {
    onOpen('RECORD_DETAIL');
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('recordId', recordId);

    // 페이지 새로고침 없이 URL만 변경
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="space-y-2 rounded-none px-4 py-6">
      {/* 수행했던 루틴 이름 및 총 운동 시간 */}
      <header className="flex items-start justify-between">
        <div className="space-y-1">
          <h5 className="text-2xl font-bold">최근 수행한 프로그램</h5>
          <div className="flex items-center gap-x-1 text-sm text-slate-500">
            <Clock className="size-3.5" />
            <span>총 운동 시간</span>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-sky-400 px-2.5 py-2 text-sm font-semibold text-white hover:bg-sky-500"
          aria-label="기록 상세 보기"
          onClick={openRecordDetailModal}
        >
          상세 보기
          <ChevronRight className="size-3.5" />
        </button>
      </header>
      <article className="space-y-3 rounded-md border border-black px-4 py-3">
        {/* 각 운동 별 세트 수와 평균 중량 */}
        {Array.from({ length: 3 }).map((rec, id) => (
          <div key={id} className="flex items-end gap-x-2">
            <span className="truncate font-medium text-slate-900">운동 이름</span>
            <div className="mb-0.5 flex items-center gap-x-1 text-xs text-slate-500">
              <span>(10)set </span>
              <span aria-hidden="true">·</span>
              <span>평균 (중량)kg</span>
            </div>
          </div>
        ))}

        {/* 이 날의 총 세트 수와 총 중량 */}

        <div className="grid grid-cols-2 gap-2 px-2 py-3">
          {dummyDayStats.map((stat, index) => (
            <StatCard key={index} stat={stat} bgColor="bg-red-200" />
          ))}
        </div>
      </article>
    </div>
  );
}

export default memo(SummarizeRecord);
