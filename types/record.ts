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
