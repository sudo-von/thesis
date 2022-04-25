import { IClassroom, IClassroomPayload } from "lib/domain/classroom";
import { IClassroomRepository } from "lib/domain/classroom.repository";

export const get_classroom = async (classroomRepository:IClassroomRepository): Promise<IClassroom[]> => {
  return await classroomRepository.get();
};

export const create_classroom = async (classroomPayload:IClassroomPayload, classroomRepository:IClassroomRepository): Promise<void> => {
  await classroomRepository.persist(classroomPayload);
};