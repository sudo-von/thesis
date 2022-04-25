import { IUniversity, IUniversityPayload } from "./university";

export interface IUniversityRepository {
  get: () => Promise<IUniversity[]>;
  persist: (advicePayload:IUniversityPayload) => Promise<void>;
};