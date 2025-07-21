/* eslint-disable @typescript-eslint/no-unused-vars */

export type ModalType = 'LOGIN' | undefined;

export type ModalStates = {
  isOpen: boolean;
  modalType: ModalType;
};

export type ModalActions = {
  onOpen: (modalType: ModalType) => void;
  onClose: () => void;
};

export type ModalStore = ModalStates & ModalActions;
