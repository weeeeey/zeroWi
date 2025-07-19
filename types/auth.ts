export type AuthHostType = 'credential' | 'google' | 'kakao';
export type OAuthHostType = Exclude<AuthHostType, 'credential'>;

export type UserInfoFromHostServer = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export type FormDataPropsType = {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
};
