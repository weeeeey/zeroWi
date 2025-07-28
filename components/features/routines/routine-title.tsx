import { ROUTINE_TITLE_KO } from '@/lib/routines/constant';
import { RoutineType } from '@/types/routine';

function RoutineTitle({ title }: { title: RoutineType }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">{ROUTINE_TITLE_KO[title]} 프로그램</h2>
      <p className="text-sm text-gray-500">Choose a workout to get started</p>
    </div>
  );
}

export default RoutineTitle;
