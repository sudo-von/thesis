import { BasicUser } from './user';

type Department = {
  id: string,
  user: BasicUser,
  description: string,
  street: string,
  neighborhood: string,
  cost: number,
  available: boolean,
};

type DepartmentPayload = {
  description: string,
  street: string,
  neighborhood: string,
  cost: number,
};

type UpdateDepartmentPayload = {
  id: string,
  description: string,
  street: string,
  neighborhood: string,
  cost: number,
  available: boolean,
};

export type {
  Department,
  DepartmentPayload,
  UpdateDepartmentPayload,
};
