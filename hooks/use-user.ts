import { create } from 'zustand';

/**
 * 사용자 상태를 정의합니다.
 */
type UserProviderStates = {
  isLogin: boolean; // 로그인 여부
  userId: string | undefined; // 사용자 ID
};

/**
 * 사용자 관련 액션들을 정의합니다.
 */
type UserProviderAction = {
  /**
   * 사용자 로그인 상태로 변경하고 사용자 ID를 설정합니다.
   * @param {string} userId - 로그인한 사용자의 ID.
   */
  onLogin: (userId: string) => void;
  /**
   * 사용자 로그아웃 상태로 변경하고 사용자 ID를 초기화합니다.
   */
  onLogout: () => void;
};

/**
 * 사용자 스토어의 전체 타입을 정의합니다.
 */
type UserProvider = UserProviderStates & UserProviderAction;

/**
 * 사용자 스토어의 기본 상태입니다.
 */
const defaultModalStates: UserProviderStates = {
  isLogin: false,
  userId: '',
};

/**
 * 사용자 로그인 상태 및 ID를 관리하는 Zustand 훅입니다.
 * `onLogin`과 `onLogout` 액션을 통해 사용자 상태를 제어할 수 있습니다.
 */
export const useUser = create<UserProvider>((set) => ({
  ...defaultModalStates,

  onLogin: (userId: string) => {
    set({
      isLogin: true,
      userId,
    });
  },
  onLogout: () => {
    set({
      isLogin: false,
      userId: undefined,
    });
  },
}));