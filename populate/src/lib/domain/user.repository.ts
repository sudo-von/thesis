import { IUser, IUserPayload } from "./user";

export interface IUserRepository {
  get: () => Promise<IUser[]>;
  persist: (advicePayload:IUserPayload) => Promise<void>;
};