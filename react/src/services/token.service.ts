import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import { Token, User } from 'src/contexts/auth.context.types';

export type DecodedToken = {
  token: Token,
  user: User,
};

const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    throw new Error('Ha ocurrido un error al intentar obtener tu token');
  }
};

const setToken = async (token:string): Promise<void> => AsyncStorage.setItem('token', token);

const deleteToken = (): Promise<void> => AsyncStorage.removeItem('token');

const decodeToken = async (): Promise<DecodedToken> => {
  const bearerToken = await getToken();
  const encodedToken = bearerToken!.split('Bearer ')[1];
  const userToken = encodedToken.split('.')[1];
  const user = Base64.decode(userToken);
  const parsedUser = JSON.parse(user);
  const result:DecodedToken = {
    token: {
      id: parsedUser.id,
      expiredAt: parsedUser.expired_at,
      issuedAt: parsedUser.issued_at,
    },
    user: {
      userId: parsedUser.user_id,
      userName: parsedUser.user_name,
      universityId: parsedUser.university_id,
      universityName: parsedUser.university_name,
      universityProfilePicture: parsedUser.university_profile_picture,
    },
  };
  return result;
};

export {
  getToken,
  setToken,
  deleteToken,
  decodeToken,
};
