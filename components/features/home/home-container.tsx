'use client';

import { normalize } from '@/lib/home/utils';
import { addDays, startOfWeek } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import HomeDatePicker from './home-date-picker';
import HomeStateCards from './home-stat-cards';
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

  return (
    <div className="bg-card overscroll-y-auto">
      <div className="sticky top-16 left-0 z-10">
        <HomeDatePicker
          selected={selected}
          setSelected={setSelected}
          weekDays={weekDays}
          onNavigateWeek={navigateWeek}
          profileCreateAt={profileCreateAt}
          maxDate={today}
          anchorDate={anchorDate}
        />
      </div>
      <SummarizeRecord profileId={profileId} day={selected} />

      <HomeStateCards today={today} />

      <WeekDiffChart weekDays={weekDays} today={today} />
    </div>
  );
}

export default HomeContainer;
