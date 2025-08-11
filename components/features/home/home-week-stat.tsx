import { dummyWeekStats } from '@/dummy';
import React, { memo } from 'react';

import StatCard from './stat-card';

{
  /* 이번 주 총 운동 중량, 총 세트, 각 타겟 별 세트   */
}
function HomeWeekStat() {
  return (
    <div className="grid grid-cols-2 gap-2 px-2 py-3">
      {dummyWeekStats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}

export default memo(HomeWeekStat);
