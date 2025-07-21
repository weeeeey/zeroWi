import type { ModalStates, ModalStore, ModalType } from '@/types/modal';
import { create } from 'zustand';

// Changed from createStore to create

// It's good practice to define the default states for clarity
const defaultModalStates: ModalStates = {
  isOpen: false,
  modalType: undefined,
};

// Define the type for the full store, including actions

export const useModal = create<ModalStore>((set) => ({
  // Initialize the state with default values
  ...defaultModalStates,

  // Define the actions
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
