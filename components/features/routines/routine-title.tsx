import { RoutineType } from '@/types/routine';

const TITLE_KO: Record<RoutineType, string> = {
  mine: '나만의',
  shared: '공유 받은',
  sharing: '공유 중인',
  total: '전체',
  latest: '최근 진행한',
};

function RoutineTitle({ title }: { title: RoutineType }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">{TITLE_KO[title]} 프로그램</h2>
      <p className="text-sm text-gray-500">Choose a workout to get started</p>
    </div>
  );
}

export default RoutineTitle;
