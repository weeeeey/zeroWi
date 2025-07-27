import { create } from 'zustand';

type UserProviderStates = {
  isLogin: boolean;
  userId: string | undefined;
};
type UserProviderAction = {
  onLogin: (userId: string) => void;
  onLogout: () => void;
};
type UserProvider = UserProviderStates & UserProviderAction;

const defaultModalStates: UserProviderStates = {
  isLogin: false,
  userId: '',
};

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
