'use client';

import ProvisionFooter from '@/components/ui/provision-footer';
import { dummyStats } from '@/dummy';
import { normalize } from '@/lib/home/utils';
import { addDays, isSameDay, startOfWeek } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';

import HomeDatePicker from './home-date-picker';
import StatCard from './stat-card';
import SummarizeRecord from './summarize-record';
import WeekDiffChart from './week-diff-chart';

const today = normalize(new Date());

function HomeContainer({
  profileId,
  profileCreateAt,
}: {
  profileId: string;
  profileCreateAt: Date;
}) {
  const [anchorDate, setAnchorDate] = useState<Date>(today);
  const [selected, setSelected] = useState<Date>(today);
  const summarizeRecordRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [anchorDate]);

  const navigateWeek = useCallback(
    (direction: 1 | -1) => {
      const minDate = normalize(profileCreateAt);
      const newAnchorDate = addDays(anchorDate, direction * 7);

      if (direction === -1 && newAnchorDate < minDate) {
        setAnchorDate(minDate);
      } else if (direction === 1 && newAnchorDate > today) {
        setAnchorDate(today);
      } else {
        setAnchorDate(newAnchorDate);
      }
    },
    [profileCreateAt, anchorDate]
  );

  //   날짜 선택 함수 및 그 날의 요약 기록으로 이동
  const toggleDay = useCallback(
    (day: Date) => {
      if (!isSameDay(day, selected)) {
        setSelected(normalize(day));
        if (summarizeRecordRef.current) {
          summarizeRecordRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    },
    [selected]
  );

  return (
    <div className="bg-card overscroll-y-auto">
      <div className="sticky top-16 left-0 z-10 shadow-md">
        <HomeDatePicker
          selected={selected}
          weekDays={weekDays}
          toggleDay={toggleDay}
          onNavigateWeek={navigateWeek}
          profileCreateAt={profileCreateAt}
          maxDate={today}
          anchorDate={anchorDate}
        />
      </div>

      {/* 이번 주 요약 */}
      {/* 이번 주 총 운동 중량, 총 세트, 각 타겟 별 세트   */}
      <div className="grid grid-cols-2 gap-2 px-2 py-3">
        {dummyStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* 선택한 주와 이번 주 비교  */}
      <div ref={chartRef}>
        <WeekDiffChart selectedWeekDays={weekDays} today={today} profileId={profileId} />
      </div>

      {/* 선택한 일수의 운동들 요약 */}
      <section ref={summarizeRecordRef}>
        <SummarizeRecord
          profileId={profileId}
          day={selected}
          recordId="cmdwryrdj00010rcg47p7q6wu"
        />
      </section>

      <ProvisionFooter />
    </div>
  );
}

export default HomeContainer;
