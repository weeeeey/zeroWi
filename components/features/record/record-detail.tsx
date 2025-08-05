import { Input } from '@/components/ui/input';
import prisma from '@/lib/db';
import { RecordedExercise } from '@/types/record';
import { redirect } from 'next/navigation';

async function RecordDetail({ recordId }: { recordId: string }) {
  const record = await prisma.record.findUnique({
    where: {
      id: recordId,
    },
  });

  if (!record) {
    redirect('/routines');
  }

  const { records } = record;
  const exercises = records as RecordedExercise[] | null;
  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-2xl font-bold">
        휴식 데이 또는 운동 기록이 없습니다
      </div>
    );
  }

  return (
    <div className="h-full">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className={`space-y-0 rounded-none border-none p-0`}>
          <div className="px-2 pb-2">
            {/* 0. 헤더 */}
            <header className="mb-2 flex items-center justify-between px-3 py-2 text-slate-100">
              <h3 className="text-2xl font-bold">{exercise.title}</h3>
            </header>

            {/* 세트 컨텐츠 */}
            {exercise.sets.map((set, setIndex) => (
              <div
                key={setIndex}
                className={`relative mb-2 flex items-end gap-4 rounded-lg border p-3`}
              >
                {/* 1. 세트 번호 */}
                <div className="absolute top-0 left-2 -translate-y-1/2 rounded-md bg-white px-2 text-slate-500">
                  <h5 className="text-sm font-medium">Set {setIndex + 1}</h5>
                </div>

                {/* 2. 무게 및 횟수 입력 필드 */}
                <div className="grid flex-1 grid-cols-2 gap-2 text-white">
                  <div>
                    <label className="mb-1 block text-xs">무게 (kg)</label>

                    <Input
                      className="bg-white text-black"
                      type="number"
                      value={set.actualWeight || '0'}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs">횟수</label>
                    <Input
                      className="bg-white text-black"
                      type="number"
                      disabled
                      value={set.actualReps || '0'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecordDetail;
