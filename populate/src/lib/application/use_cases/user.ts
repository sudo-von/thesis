import { IUser, IUserPayload } from "lib/domain/user";
import { IUserRepository } from "lib/domain/user.repository";

export const get_user = async (userRepository:IUserRepository): Promise<IUser[]> => {
  return await userRepository.get();
};

export const create_user = async (userPayload:IUserPayload, userRepository:IUserRepository): Promise<void> => {
  await userRepository.persist(userPayload);
};