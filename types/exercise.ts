export type ExerciseTargetBody = '등' | '어깨' | '가슴' | '팔' | '하체' | '전신';
export type ExerciseMethod = '머신' | '프리웨이트' | '맨몸';
export type ExerciseDevied = '무분할' | '2분할' | '3분할' | '4분할' | '5분할';

export type ExerciseInformation = {
  title: string;
  target: ExerciseTargetBody;
  method: ExerciseMethod;
  description: string;
};
