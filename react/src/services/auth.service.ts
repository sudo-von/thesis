import { Base64 } from 'js-base64';
import { post } from 'src/helpers/public-axios-helper';
import { setToken, decodeToken, DecodedToken } from './token.service';

export type LoginPayload = {
  email: string,
  password: string,
};

const login = async ({ email, password }: LoginPayload):Promise<DecodedToken> => {
  const request = await post('/auth/login', {}, {
    headers: {
      Authorization: `Basic ${Base64.encode(`${email}:${password}`)}`,
    },
  });
  await setToken(request.headers.authorization);
  const result = await decodeToken();
  return result;
};

export default login;
