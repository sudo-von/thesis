import responseErrorStrings from 'src/constants/errors';

export type Configuration = {
  baseURL: string,
  timeout: number,
  headers: object,
};

export type ResponseError = {
  status: number,
  message: string,
  code: keyof typeof responseErrorStrings,
};

const configuration: Configuration = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.0.4:4000' : 'https://www.website.com:port/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default configuration;
