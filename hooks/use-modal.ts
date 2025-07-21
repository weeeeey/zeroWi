import type { ModalStates, ModalStore, ModalType } from '@/types/modal';
import { create } from 'zustand';

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
