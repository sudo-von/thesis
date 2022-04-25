import { ISuggestion, ISuggestionPayload } from "./suggestion";

export interface ISuggestionRepository {
  get: () => Promise<ISuggestion[]>;
  persist: (advicePayload:ISuggestionPayload) => Promise<void>;
};