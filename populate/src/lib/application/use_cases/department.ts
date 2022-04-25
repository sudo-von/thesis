import { IDepartment, IDepartmentPayload } from "lib/domain/department";
import { IDepartmentRepository } from "lib/domain/department.repository";

export const get_department = async (departmentRepository:IDepartmentRepository): Promise<IDepartment[]> => {
  return await departmentRepository.get();
};

export const create_department = async (departmentPayload:IDepartmentPayload, departmentRepository:IDepartmentRepository): Promise<void> => {
  await departmentRepository.persist(departmentPayload);
};