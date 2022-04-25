import { IUserMood, IUserMoodPayload } from "./userMood";

export interface IUserMoodRepository {
  get: () => Promise<IUserMood[]>;
  persist: (advicePayload:IUserMoodPayload) => Promise<void>;
};