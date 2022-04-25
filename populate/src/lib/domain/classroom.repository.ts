import { IClassroom, IClassroomPayload } from "./classroom";

export interface IClassroomRepository {
  get: () => Promise<IClassroom[]>;
  persist: (advicePayload:IClassroomPayload) => Promise<void>;
};