'use client';

import { addDays, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';

import HomeDatePicker from './home-date-picker';

const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

function HomeContainer({
  profileId,
  profileCreateAt,
}: {
  profileId: string;
  profileCreateAt: Date;
}) {
  const today = normalize(new Date());
  const minDate = normalize(profileCreateAt);

  const [anchorDate, setAnchorDate] = useState<Date>(today);
  const [selected, setSelected] = useState<Date>(today);

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [anchorDate]);

  const navigateWeek = (direction: 1 | -1) => {
    const newAnchorDate = addDays(anchorDate, direction * 7);

    if (direction === -1 && newAnchorDate < minDate) {
      setAnchorDate(minDate);
    } else if (direction === 1 && newAnchorDate > today) {
      setAnchorDate(today);
    } else {
      setAnchorDate(newAnchorDate);
    }
  };

  return (
    <div className="h-full bg-white">
      <HomeDatePicker
        selected={selected}
        setSelected={setSelected}
        weekDays={weekDays}
        onNavigateWeek={navigateWeek}
        minDate={minDate}
        maxDate={today}
        anchorDate={anchorDate}
      />
    </div>
  );
}

export default HomeContainer;
