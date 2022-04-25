import { IAdvice, IAdvicePayload } from "./advice";

export interface IAdviceRepository {
  get: () => Promise<IAdvice[]>;
  persist: (advicePayload:IAdvicePayload) => Promise<void>;
};