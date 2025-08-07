import { create } from 'zustand';

export type RoutineType = 'single' | 'multi';

export type CreateExerciseSet = {
  setNumber: number;
  targetWeight?: number;
  targetReps?: string;
  restSeconds: number;
};

export type CreateRoutineExercise = {
  title: string;
  sets: CreateExerciseSet[];
};

type AddExerciseState = {
  routineType: RoutineType;
  totalDays: number;
  currentDay: number;

  selectedExercisesByDay: Record<number, CreateRoutineExercise[]>;
};

export type UpdateExerciseKey = keyof CreateExerciseSet;

type AddExerciseAction = {
  setRoutineConfig: (type: RoutineType, weeks?: number) => void;
  setCurrentDay: (day: number) => void;

  handleAddExercise: (exercise: CreateRoutineExercise, day?: number) => void;
  handleRemoveExercise: (exerciseTitle: string, day?: number) => void;

  updateExerciseTitle: (oldTitle: string, newTitle: string, day?: number) => void;

  replaceExerciseWithNew: (
    oldTitle: string,
    newExercise: CreateRoutineExercise,
    day?: number
  ) => void;

  updateExerciseSetValue: (
    title: string,
    setNumber: number,
    key: UpdateExerciseKey,
    value: string | number,
    day?: number
  ) => void;

  removeExerciseSet: (title: string, setNumber: number, day?: number) => void;

  addExerciseSet: (title: string, day?: number) => void;

  getExercisesForDay: (day?: number) => CreateRoutineExercise[];
  getCurrentDayExercises: () => CreateRoutineExercise[];

  hasEmptyDays: () => boolean;

  handleInit: (type: RoutineType) => void;
};

type AddExercise = AddExerciseState & AddExerciseAction;

const getDefaultState = (type: RoutineType): AddExerciseState => {
  const defaultTotalDays = type === 'single' ? 1 : 1 * 7;
  return {
    routineType: type,
    totalDays: defaultTotalDays,
    currentDay: 1,
    selectedExercisesByDay: { 1: [] },
  };
};

export const useAddExerciseRoutine = create<AddExercise>((set, get) => ({
  ...getDefaultState('single'),

  setRoutineConfig: (type: RoutineType, weeks = 1) => {
    const totalDays = type === 'single' ? 1 : weeks * 7;
    const initialExercisesByDay: Record<number, CreateRoutineExercise[]> = {};

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

  handleAddExercise: (exercise: CreateRoutineExercise, day?: number) => {
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

  handleInit: (type: RoutineType) => {
    const defaultState = getDefaultState(type);
    set(defaultState);
  },
}));
