import { IDepartment, IDepartmentPayload } from "./department";

export interface IDepartmentRepository {
  get: () => Promise<IDepartment[]>;
  persist: (advicePayload:IDepartmentPayload) => Promise<void>;
};