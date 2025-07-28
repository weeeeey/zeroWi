import DiffChart from '@/components/features/record/diff-chart';
import StatCard from '@/components/features/record/stat-card';
import { RoutineCardGroup, RoutineTitle } from '@/components/features/routines';
import { dummyStats } from '@/dummy';
import { getCurrentUser } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect('/dashboard');
  }
  return (
    <div className="container space-y-4">
      <DiffChart />
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {dummyStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      {/* Section Title */}
      <RoutineTitle title="latest" />
      {/* Routine Cards */}
      <RoutineCardGroup type="latest" userId="asds" />
    </div>
  );
}
