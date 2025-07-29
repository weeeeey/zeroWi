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
