import { dummyExerciseInfos } from '@/dummy';
import { CreateRoutineExercise, useAddExerciseRoutine } from '@/hooks/use-add-exercise-routine';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import { ExerciseInformation, ExerciseMethod, ExerciseTargetBody } from '@/types/exercise';
import { useState } from 'react';

import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import ContainerModal from './container-modal';
import SectionModal from './section-modal';

const MAX_HEIGHT = '70vh';
// const MIN_HEIGHT = '70vh';

function ExercisesInfoModal() {
  const { isOpen, modalType } = useModal();
  const modalOpen = isOpen && modalType === 'EXERCISES_INFO';
  if (!modalOpen) return null;
  return (
    <ContainerModal maxHeight={MAX_HEIGHT} modalOpen={modalOpen} widthRadio={0.9}>
      <ExercisesInfoSection />
    </ContainerModal>
  );
}

const TARGET_BODYS: ExerciseTargetBody[] = ['가슴', '등', '어깨', '전신', '팔', '하체'];

function ExercisesInfoSection() {
  const [targetBody, setTargetBody] = useState<ExerciseTargetBody>('가슴');
  const currentExerciseInformations = dummyExerciseInfos.filter((d) => d.target === targetBody);

  const handleTargetBodyClick = (tb: ExerciseTargetBody) => {
    if (tb === targetBody) return;
    setTargetBody(tb);
  };

  return (
    <SectionModal maxHeight={MAX_HEIGHT} className={`flex flex-col p-4 h-[${[MAX_HEIGHT]}]`}>
      <header>
        <h2 className="text-xl font-semibold">운동 종목 선택</h2>
        <p className="mt-1 text-sm text-slate-500">운동을 선택하면 루틴에 추가 돼요</p>
      </header>

      {/* 부위 선택 */}
      <ul className="flex items-center justify-start space-x-2 *:flex-1">
        {TARGET_BODYS.map((tb, idx) => (
          <li
            key={idx}
            aria-label={tb}
            onClick={() => handleTargetBodyClick(tb)}
            className={cn(
              'cursor-pointer rounded-md bg-slate-200 py-2 text-center text-sm font-semibold text-slate-600',
              targetBody === tb && 'bg-indigo-500 text-white'
            )}
          >
            {tb}
          </li>
        ))}
      </ul>

      {/* 부위 별 운동 리스트 */}
      <div className="h-full flex-1 space-y-2 overflow-y-scroll">
        {currentExerciseInformations.map((exInfo, idx) => (
          <ExercisesInfoCard key={`${exInfo.title}-${idx}`} data={exInfo} />
        ))}
      </div>
    </SectionModal>
  );
}

const badgeColor: Record<ExerciseMethod, string> = {
  맨몸: '#DA70D6',
  프리웨이트: '#48D1CC',
  머신: '#FF7F50',
};

function ExercisesInfoCard({ data }: { data: ExerciseInformation }) {
  const { title, method, description } = data;
  const { handleAddExercise, handleRemoveExercise, getCurrentDayExercises } =
    useAddExerciseRoutine();
  const selectedExercises = getCurrentDayExercises().map((v) => v.title);

  const isAddedExercise = selectedExercises.includes(title);

  const handleClick = () => {
    if (isAddedExercise) {
      handleRemoveExercise(title);
    } else {
      const defaultExercise: CreateRoutineExercise = {
        title,
        sets: Array.from({ length: 3 }, (_, id) => ({
          setNumber: id,
          restSeconds: 60,
        })),
      };
      handleAddExercise(defaultExercise);
    }
  };

  return (
    <Card className="p-0">
      <CardContent
        className={cn(
          'flex cursor-pointer items-center gap-x-2 rounded-md p-2',
          isAddedExercise && 'bg-blue-500'
        )}
        onClick={handleClick}
      >
        {/* 이미지 */}
        <div className="size-20 rounded-md bg-slate-300" />
        {/* 운동 설명 */}
        <div className="h-20 flex-1 overflow-hidden">
          <header className="flex items-end gap-x-1">
            <h3 className={cn('font-bold', isAddedExercise && 'text-white')}>{title}</h3>
            <Badge
              style={{
                backgroundColor: badgeColor[method],
              }}
            >
              {method}
            </Badge>
          </header>
          <p
            className={cn('text-sm text-wrap text-slate-500', isAddedExercise && 'text-slate-200')}
          >
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExercisesInfoModal;
