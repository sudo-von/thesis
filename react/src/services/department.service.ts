import { Department, DepartmentPayload, UpdateDepartmentPayload } from 'src/entities/department';
import {
  get, post, patch, destroy,
} from 'src/helpers/protected-axios-helper';

const BASE_URL = '/departments';

type DepartmentListResponse = {
  total: number,
  results: Department[]
};

const getDepartmentByID = async (departmentId:string): Promise<Department> => {
  const response = await get<Department>(`${BASE_URL}/${departmentId}`);
  return response.data;
};

const getDepartments = async (): Promise<Department[]> => {
  const response = await get<DepartmentListResponse>(BASE_URL);
  return response.data.results;
};

const createDepartment = async (departmentPayload:DepartmentPayload): Promise<void> => {
  await post(BASE_URL, departmentPayload);
};

const deleteDepartmentByID = async (departmentId:string): Promise<void> => {
  await destroy(`${BASE_URL}/${departmentId}`);
};

const updateDepartmentByID = async (departmentPayload:UpdateDepartmentPayload)
: Promise<void> => {
  await patch(`${BASE_URL}/${departmentPayload.id}`, departmentPayload);
};

export {
  getDepartmentByID,
  getDepartments,
  createDepartment,
  deleteDepartmentByID,
  updateDepartmentByID,
};
