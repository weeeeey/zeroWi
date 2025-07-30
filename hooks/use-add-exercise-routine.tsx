// import type { ExerciseTargetBody } from '@/types/exercise';
import { create } from 'zustand';

type RoutineType = 'single' | 'multi';

type AddExerciseState = {
  routineType: RoutineType;
  totalDays: number;
  currentDay: number;
  selectedExercisesByDay: Record<number, string[]>;
  //   selectedTargetBodies: ExerciseTargetBody[];
};

type AddExerciseAction = {
  // 루틴 타입 및 기간 설정
  setRoutineConfig: (type: RoutineType, weeks?: number) => void;

  // 현재 선택된 일자 변경
  setCurrentDay: (day: number) => void;

  // 운동 추가/제거 (현재 선택된 일자 기준)
  handleAdd: (exerciseTitle: string, day?: number) => void;
  handleRemove: (exerciseTitle: string, day?: number) => void;

  // 특정 일자의 운동 목록 가져오기
  getExercisesForDay: (day?: number) => string[];

  // 현재 선택된 일자의 운동 목록 가져오기
  getCurrentDayExercises: () => string[];

  // 초기화
  handleInit: () => void;
};

type AddExercise = AddExerciseState & AddExerciseAction;

const defaultState: AddExerciseState = {
  routineType: 'single',
  totalDays: 1,
  currentDay: 1,
  selectedExercisesByDay: { 1: [] },
  // selectedTargetBodies: []
};

export const useAddExerciseRoutine = create<AddExercise>((set, get) => ({
  ...defaultState,

  setRoutineConfig: (type: RoutineType, weeks = 1) => {
    const totalDays = type === 'single' ? 1 : weeks * 7;
    const initialExercisesByDay: Record<number, string[]> = {};

    // 모든 일자에 대해 빈 배열로 초기화
    for (let i = 1; i <= totalDays; i++) {
      initialExercisesByDay[i] = [];
    }

    set({
      routineType: type,
      totalDays,
      currentDay: 1,
      selectedExercisesByDay: initialExercisesByDay,
    });
  },

  setCurrentDay: (day: number) => {
    const { totalDays } = get();
    if (day >= 1 && day <= totalDays) {
      set({ currentDay: day });
    }
  },

  handleAdd: (exerciseTitle: string, day?: number) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const currentExercises = prev.selectedExercisesByDay[targetDay] || [];

      // 이미 존재하는 운동인지 확인
      if (!currentExercises.includes(exerciseTitle)) {
        return {
          ...prev,
          selectedExercisesByDay: {
            ...prev.selectedExercisesByDay,
            [targetDay]: [...currentExercises, exerciseTitle],
          },
        };
      }

      return prev;
    });
  },

  handleRemove: (exerciseTitle: string, day?: number) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const currentExercises = prev.selectedExercisesByDay[targetDay] || [];
      const filteredExercises = currentExercises.filter((title) => title !== exerciseTitle);

      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: filteredExercises,
        },
      };
    });
  },

  getExercisesForDay: (day?: number) => {
    const { currentDay, selectedExercisesByDay } = get();
    const targetDay = day ?? currentDay;
    return selectedExercisesByDay[targetDay] || [];
  },

  getCurrentDayExercises: () => {
    const { currentDay, selectedExercisesByDay } = get();
    return selectedExercisesByDay[currentDay] || [];
  },

  handleInit: () => {
    set(defaultState);
  },
}));
