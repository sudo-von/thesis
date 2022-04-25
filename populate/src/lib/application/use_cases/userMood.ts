import { IUserMood, IUserMoodPayload } from "lib/domain/userMood";
import { IUserMoodRepository } from "lib/domain/userMood.repository";

export const get_userMood = async (userMoodRepository:IUserMoodRepository): Promise<IUserMood[]> => {
  return await userMoodRepository.get();
};

export const create_userMood = async (userMoodPayload:IUserMoodPayload, userMoodRepository:IUserMoodRepository): Promise<void> => {
  await userMoodRepository.persist(userMoodPayload);
};