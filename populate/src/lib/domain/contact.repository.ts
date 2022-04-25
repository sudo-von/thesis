import { IContact, IContactPayload } from "./contact";

export interface IContactRepository {
  get: () => Promise<IContact[]>;
  persist: (advicePayload:IContactPayload) => Promise<void>;
};