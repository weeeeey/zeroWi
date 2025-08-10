import { Card, CardContent } from '@/components/ui/card';
import { dummyStats } from '@/dummy';
import { Stats } from '@/types/record';
import { memo } from 'react';

// 한 주와 특정 날의 상태를 나타내는 컴포넌트
// props 변경 필요

function HomeStateCards({ today }: { today: Date }) {
  return (
    <div className="grid grid-cols-2 gap-2 px-2 py-3">
      {dummyStats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: Stats }) {
  return (
    <Card className="border-none bg-sky-50 shadow-sm">
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        <div className="text-sm text-gray-500">{stat.label}</div>
        <div className="text-xs text-gray-400">{stat.unit}</div>
      </CardContent>
    </Card>
  );
}

export default memo(HomeStateCards);
