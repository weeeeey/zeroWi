import { create } from 'zustand';

/**
 * 프로그램 타입을 정의합니다.
 * 'single'은 단일 운동 프로그램을, 'multi'는 여러 날에 걸친 운동 프로그램을 의미합니다.
 */
export type ProgramType = 'single' | 'multi';

/**
 * 운동 세트의 상세 정보를 정의합니다.
 */
export type CreateExerciseSet = {
  setNumber: number; // 세트 번호
  targetWeight?: number; // 목표 무게 (선택 사항)
  targetReps?: string; // 목표 반복 횟수 (선택 사항)
  restSeconds: number; // 휴식 시간 (초)
};

/**
 * 프로그램에 추가될 운동의 상세 정보를 정의합니다.
 */
export type CreateProgramExercise = {
  title: string; // 운동 이름
  sets: CreateExerciseSet[]; // 운동 세트 목록
};

/**
 * 운동 추가 상태를 정의합니다.
 */
type AddExerciseState = {
  programType: ProgramType; // 현재 프로그램 타입
  totalDays: number; // 총 운동 일수
  currentDay: number; // 현재 선택된 운동 일수
  selectedExercisesByDay: Record<number, CreateProgramExercise[]>; // 일수별 선택된 운동 목록
};

/**
 * 운동 세트 값 업데이트 시 사용되는 키의 타입을 정의합니다.
 */
export type UpdateExerciseKey = keyof CreateExerciseSet;

/**
 * 운동 추가 액션들을 정의합니다.
 */
type AddExerciseAction = {
  /**
   * 프로그램 설정을 초기화하거나 업데이트합니다.
   * @param {ProgramType} type - 설정할 프로그램 타입.
   * @param {number} [weeks] - 'multi' 타입일 경우 총 주차 수 (기본값 1).
   */
  setProgramConfig: (type: ProgramType, weeks?: number) => void;
  /**
   * 현재 선택된 운동 일수를 설정합니다.
   * @param {number} day - 설정할 일수.
   */
  setCurrentDay: (day: number) => void;

  /**
   * 특정 일수에 운동을 추가합니다.
   * @param {CreateProgramExercise} exercise - 추가할 운동 객체.
   * @param {number} [day] - 운동을 추가할 일수 (기본값은 `currentDay`).
   */
  handleAddExercise: (exercise: CreateProgramExercise, day?: number) => void;
  /**
   * 특정 일수에서 운동을 제거합니다.
   * @param {string} exerciseTitle - 제거할 운동의 이름.
   * @param {number} [day] - 운동을 제거할 일수 (기본값은 `currentDay`).
   */
  handleRemoveExercise: (exerciseTitle: string, day?: number) => void;

  /**
   * 특정 일수에서 운동의 이름을 업데이트합니다.
   * @param {string} oldTitle - 변경 전 운동 이름.
   * @param {string} newTitle - 변경 후 운동 이름.
   * @param {number} [day] - 운동 이름이 있는 일수 (기본값은 `currentDay`).
   */
  updateExerciseTitle: (oldTitle: string, newTitle: string, day?: number) => void;

  /**
   * 특정 일수에서 기존 운동을 새로운 운동으로 교체합니다.
   * @param {string} oldTitle - 교체할 기존 운동 이름.
   * @param {CreateProgramExercise} newExercise - 교체할 새로운 운동 객체.
   * @param {number} [day] - 운동이 있는 일수 (기본값은 `currentDay`).
   */
  replaceExerciseWithNew: (
    oldTitle: string,
    newExercise: CreateProgramExercise,
    day?: number
  ) => void;

  /**
   * 특정 일수에서 운동 세트의 특정 값을 업데이트합니다.
   * @param {string} title - 운동 이름.
   * @param {number} setNumber - 업데이트할 세트 번호.
   * @param {UpdateExerciseKey} key - 업데이트할 속성 키 (예: 'targetWeight', 'targetReps').
   * @param {string | number} value - 업데이트할 값.
   * @param {number} [day] - 운동이 있는 일수 (기본값은 `currentDay`).
   */
  updateExerciseSetValue: (
    title: string,
    setNumber: number,
    key: UpdateExerciseKey,
    value: string | number,
    day?: number
  ) => void;

  /**
   * 특정 일수에서 운동의 특정 세트를 제거합니다.
   * @param {string} title - 운동 이름.
   * @param {number} setNumber - 제거할 세트 번호.
   * @param {number} [day] - 운동이 있는 일수 (기본값은 `currentDay`).
   */
  removeExerciseSet: (title: string, setNumber: number, day?: number) => void;

  /**
   * 특정 일수에서 운동에 새로운 세트를 추가합니다.
   * @param {string} title - 운동 이름.
   * @param {number} [day] - 운동이 있는 일수 (기본값은 `currentDay`).
   */
  addExerciseSet: (title: string, day?: number) => void;

  /**
   * 특정 일수의 운동 목록을 가져옵니다.
   * @param {number} [day] - 운동 목록을 가져올 일수 (기본값은 `currentDay`).
   * @returns {CreateProgramExercise[]} 해당 일수의 운동 목록.
   */
  getExercisesForDay: (day?: number) => CreateProgramExercise[];
  /**
   * 현재 선택된 일수의 운동 목록을 가져옵니다.
   * @returns {CreateProgramExercise[]} 현재 일수의 운동 목록.
   */
  getCurrentDayExercises: () => CreateProgramExercise[];

  /**
   * 비어있는 운동 일수가 있는지 확인합니다.
   * @returns {boolean} 비어있는 일수가 하나라도 있으면 `true`, 그렇지 않으면 `false`.
   */
  hasEmptyDays: () => boolean;

  /**
   * 스토어 상태를 초기화합니다.
   * @param {ProgramType} type - 초기화할 프로그램 타입.
   */
  handleInit: (type: ProgramType) => void;
};

type AddExercise = AddExerciseState & AddExerciseAction;

/**
 * 기본 상태를 반환합니다.
 * @param {ProgramType} type - 프로그램 타입.
 * @returns {AddExerciseState} 기본 상태 객체.
 */
const getDefaultState = (type: ProgramType): AddExerciseState => {
  const defaultTotalDays = type === 'single' ? 1 : 1 * 7;
  return {
    programType: type,
    totalDays: defaultTotalDays,
    currentDay: 1,
    selectedExercisesByDay: { 1: [] },
  };
};

/**
 * 운동 프로그램 생성 및 관리를 위한 Zustand 스토어 훅입니다.
 * 선택된 운동, 세트, 일수 등을 관리하는 상태와 액션들을 제공합니다.
 */
export const useAddExerciseProgram = create<AddExercise>((set, get) => ({
  ...getDefaultState('single'),

  setProgramConfig: (type: ProgramType, weeks = 1) => {
    const totalDays = type === 'single' ? 1 : weeks * 7;
    const initialExercisesByDay: Record<number, CreateProgramExercise[]> = {};

    for (let i = 1; i <= totalDays; i++) {
      initialExercisesByDay[i] = [];
    }

    set({
      programType: type,
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

  handleAddExercise: (exercise: CreateProgramExercise, day?: number) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const currentExercises = prev.selectedExercisesByDay[targetDay] || [];

      const alreadyExists = currentExercises.some((e) => e.title === exercise.title);

      if (!alreadyExists) {
        return {
          ...prev,
          selectedExercisesByDay: {
            ...prev.selectedExercisesByDay,
            [targetDay]: [...currentExercises, exercise],
          },
        };
      }

      return prev;
    });
  },

  handleRemoveExercise: (exerciseTitle: string, day?: number) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const currentExercises = prev.selectedExercisesByDay[targetDay] || [];
      const filtered = currentExercises.filter((e) => e.title !== exerciseTitle);

      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: filtered,
        },
      };
    });
  },

  updateExerciseTitle: (oldTitle, newTitle, day) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const exercises = prev.selectedExercisesByDay[targetDay] || [];
      const updated = exercises.map((e) => (e.title === oldTitle ? { ...e, title: newTitle } : e));
      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: updated,
        },
      };
    });
  },

  replaceExerciseWithNew: (oldTitle, newExercise, day) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const exercises = prev.selectedExercisesByDay[targetDay] || [];
      const replaced = exercises.map((e) => (e.title === oldTitle ? newExercise : e));
      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: replaced,
        },
      };
    });
  },

  updateExerciseSetValue: (title, setNumber, key, value, day) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const exercises = prev.selectedExercisesByDay[targetDay] || [];
      const updated = exercises.map((e) => {
        if (e.title !== title) return e;
        const updatedSets = e.sets.map((set) =>
          set.setNumber === setNumber ? { ...set, [key]: value } : set
        );
        return { ...e, sets: updatedSets };
      });
      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: updated,
        },
      };
    });
  },

  removeExerciseSet: (title, setNumber, day) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const exercises = prev.selectedExercisesByDay[targetDay] || [];
      const updated = exercises.map((e) =>
        e.title !== title
          ? e
          : {
              ...e,
              sets: e.sets.filter((set) => set.setNumber !== setNumber),
            }
      );
      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: updated,
        },
      };
    });
  },

  addExerciseSet: (title, day) => {
    const { currentDay } = get();
    const targetDay = day ?? currentDay;

    set((prev) => {
      const exercises = prev.selectedExercisesByDay[targetDay] || [];
      const updated = exercises.map((e) => {
        if (e.title !== title) return e;
        const nextSetNumber = Math.max(0, ...e.sets.map((s) => s.setNumber)) + 1;
        const newSet: CreateExerciseSet = {
          setNumber: nextSetNumber,
          targetWeight: undefined,
          targetReps: '',
          restSeconds: 60,
        };
        return {
          ...e,
          sets: [...e.sets, newSet],
        };
      });
      return {
        ...prev,
        selectedExercisesByDay: {
          ...prev.selectedExercisesByDay,
          [targetDay]: updated,
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

  hasEmptyDays: () => {
    const { totalDays, selectedExercisesByDay } = get();
    for (let day = 1; day <= totalDays; day++) {
      const exercises = selectedExercisesByDay[day];
      if (!exercises || exercises.length === 0) {
        return true;
      }
    }
    return false;
  },

  handleInit: (type: ProgramType) => {
    const defaultState = getDefaultState(type);
    set(defaultState);
  },
}));