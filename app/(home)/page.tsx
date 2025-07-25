import StatCard from '@/components/features/record/stat-card';
import RoutineCard from '@/components/features/routines/routine-card';
import { dummyRoutines, dummyStats } from '@/dummy';

export default function HomePage() {
  return (
    <div className="container">
      {/* Stats Cards */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          {dummyStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">등록 된 프로그램</h2>
        <p className="text-sm text-gray-500">Choose a workout to get started</p>
      </div>
      {/* Routine Cards */}
      <div className="space-y-4">
        {dummyRoutines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
}
