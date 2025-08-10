import { PROGRAM_TITLE_KO } from '@/lib/programs/constant';
import { ProgramType } from '@/types/program';

function ProgramTitle({ title }: { title: ProgramType }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{PROGRAM_TITLE_KO[title]} 프로그램</h2>
      <p className="text-sm text-gray-500">Choose a workout to get started</p>
    </div>
  );
}

export default ProgramTitle;
