export type AuthHostType = 'credential' | 'google' | 'kakao';

export type UserInfoFromHostServer = {
  id: string;
  email: string;
  name: string;
  picture: string;
};
