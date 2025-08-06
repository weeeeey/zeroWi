import { create } from 'zustand';

export type ModalType = 'LOGIN' | 'EXERCISES_INFO' | 'ROUTINE_DETAIL' | 'RECORD_DETAIL' | undefined;

type ModalStates = {
  isOpen: boolean;
  modalType: ModalType;
};

type ModalActions = {
  onOpen: (modalType: ModalType) => void;
  onClose: () => void;
};

type ModalStore = ModalStates & ModalActions;

const defaultModalStates: ModalStates = {
  isOpen: false,
  modalType: undefined,
};

export const useModal = create<ModalStore>((set) => ({
  ...defaultModalStates,

  onOpen: (modalType: ModalType) => {
    set({
      isOpen: true,
      modalType,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
      modalType: undefined,
    });
  },
}));
