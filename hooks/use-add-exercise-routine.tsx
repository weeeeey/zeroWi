// import type { ExerciseTargetBody } from '@/types/exercise';
import { create } from 'zustand';

type AddExerciseState = {
  selectedExerciseTitles: string[];
  //   selectedTargetBodies: ExerciseTargetBody[];
};

type AddExerciseAction = {
  handleAdd: (exerciseTitle: string) => void;
  handleRemove: (exerciseTitle: string) => void;
  handleInit: () => void; // 언마운트 때 실행시킬 용도
};

type AddExercise = AddExerciseState & AddExerciseAction;

const defaultState: AddExerciseState = {
  selectedExerciseTitles: [],
  // selectedTargetBodies:[]
};

export const useAddExerciseRoutine = create<AddExercise>((set) => ({
  ...defaultState,
  handleAdd: (title: string) => {
    set((prev) => {
      const prevTitles = prev.selectedExerciseTitles;
      if (!prevTitles.includes(title)) {
        prevTitles.push(title);
      }
      return {
        ...prev,
        selectedExerciseTitles: prevTitles,
      };
    });
  },
  handleRemove: (title: string) => {
    set((prev) => {
      const titlesDeletedTarget = prev.selectedExerciseTitles.filter((value) => value !== title);
      return {
        ...prev,
        selectedExerciseTitles: titlesDeletedTarget,
      };
    });
  },
  handleInit: () => {
    set({
      selectedExerciseTitles: [],
    });
  },
}));

/**
export type ModalType = 'LOGIN' | 'EXERCISES_INFO' | 'CREATOR_CONFIRM' | undefined;

export type ModalStates = {
  isOpen: boolean;
  modalType: ModalType;
};

export type ModalActions = {
  onOpen: (modalType: ModalType) => void;
  onClose: () => void;
};

export type ModalStore = ModalStates & ModalActions;

 * 
 */
