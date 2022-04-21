import { User } from 'src/contexts/auth.context.types';

export enum AuthActionKind {
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE = 'update',
}

export type AuthAction = {
  type: AuthActionKind,
  payload: User,
};
