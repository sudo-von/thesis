import { AuthAction } from 'src/reducers/auth.actions';

export type Token = {
  id: string,
  expiredAt: string,
  issuedAt: string,
};

export type User = {
  userId: string,
  userName: string,
  email: string,
  universityId: string,
  universityName: string,
  universityProfilePicture: string,
};

export type AuthContextState = {
  isLoggedIn: boolean,
  user: User,
};

export type AuthContextType = {
  authState: AuthContextState;
  authDispatch: React.Dispatch<AuthAction>
};
