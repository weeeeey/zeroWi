import { ExerciseMethod, ExerciseTargetBody } from './exercise';

export type Exercise = {
  name: string;
  method: ExerciseMethod;
  targetBodys: ExerciseTargetBody[];
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

export type CreateRoutineExercise = {
  title: string;
  sets: CreateExerciseSet[];
};

export type CreateExerciseSet = {
  setNumber: number;
  targetWeight?: number;
  targetReps?: string;
  restSeconds: number;
};

// 실제 기록을 위한 타입
export type RecordedSet = {
  setNumber: number;
  actualWeight?: number;
  actualReps?: string;
  isCompleted: boolean;
  targetWeight?: number;
  targetReps?: string;
  restSeconds: number;
};

export type RecordedExercise = {
  title: string;
  sets: RecordedSet[];
  // isCompleted: boolean;
};

export type RecordSubmitType = {
  routineId: string;

  records: RecordedExercise[];
};
