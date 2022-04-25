import { IUniversity, IUniversityPayload } from "lib/domain/university";
import { IUniversityRepository } from "lib/domain/university.repository";

export const get_university = async (universityRepository:IUniversityRepository): Promise<IUniversity[]> => {
  return await universityRepository.get();
};

export const create_university = async (universityPayload:IUniversityPayload, universityRepository:IUniversityRepository): Promise<void> => {
  await universityRepository.persist(universityPayload);
};