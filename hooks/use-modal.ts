import { create } from 'zustand';

/**
 * 모달의 타입을 정의합니다.
 * 각 모달은 고유한 타입을 가질 수 있습니다.
 */
export type ModalType = 'LOGIN' | 'EXERCISES_INFO' | 'PROGRAM_DETAIL' | 'RECORD_DETAIL' | undefined;

/**
 * 모달 상태를 정의합니다.
 */
type ModalStates = {
  isOpen: boolean; // 모달이 열려있는지 여부
  modalType: ModalType; // 현재 열려있는 모달의 타입
};

/**
 * 모달 액션들을 정의합니다.
 */
type ModalActions = {
  /**
   * 특정 타입의 모달을 엽니다.
   * @param {ModalType} modalType - 열 모달의 타입.
   */
  onOpen: (modalType: ModalType) => void;
  /**
   * 현재 열려있는 모달을 닫습니다.
   */
  onClose: () => void;
};

/**
 * 모달 스토어의 전체 타입을 정의합니다.
 */
type ModalStore = ModalStates & ModalActions;

/**
 * 모달의 기본 상태입니다.
 */
const defaultModalStates: ModalStates = {
  isOpen: false,
  modalType: undefined,
};

/**
 * 모달의 열림/닫힘 상태 및 모달 타입을 관리하는 Zustand 훅입니다.
 * `onOpen`과 `onClose` 액션을 통해 모달 상태를 제어할 수 있습니다.
 */
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