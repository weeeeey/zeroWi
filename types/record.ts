export type Body = '등' | '어깨' | '가슴' | '팔' | '하체' | '전신';
export type ExerciseMethod = '머신' | '프리웨이트' | '맨몸';

export type Exercise = {
  name: string;
  method: ExerciseMethod;
  targetBodys: Body[];
};

export type ExerciseSet = {
  reps: string;
  weight: string;
  restTime: number;
};

export type ExerciseTargetSet = Exercise & {
  sets: ExerciseSet[];
};

export type ExerciseRecordSet = ExerciseTargetSet;

export type Stats = {
  label: string;
  value: string;
  unit?: string;
};
