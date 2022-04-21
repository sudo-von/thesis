import { TinyUser, TinyUserPayload, UserPayload } from 'src/entities/user';
import { post, get, patch } from 'src/helpers/protected-axios-helper';

const BASE_URL = '/users';

const signup = async (user:UserPayload): Promise<void> => {
  await post(BASE_URL, user);
};

const getUserByID = async (userId:string): Promise<TinyUser> => {
  const response = await get<TinyUser>(`${BASE_URL}/${userId}`);
  return response.data;
};

const updateUserByID = async (userId:string, user:TinyUserPayload): Promise<void> => {
  await patch(`${BASE_URL}/${userId}`, user);
};

export {
  signup,
  getUserByID,
  updateUserByID,
};
