import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import { getToken, deleteToken } from 'src/services/token.service';
import { navigate } from 'src/refs/navigation.ref';
import responseErrorStrings from 'src/constants/errors';
import { camelizeKeys, decamelizeKeys } from 'humps';
import configuration, { ResponseError } from './axios-helper';

const client: AxiosInstance = axios.create(configuration);

const handleHeader = async (config:AxiosRequestConfig) => {
  const token = await getToken();
  const configRequest:AxiosRequestConfig = config;
  if (!configRequest.headers.Authorization && token) {
    configRequest.headers.Authorization = token;
  }
  configRequest.data = decamelizeKeys(config.data);
  return configRequest;
};

const onResponse = (response: AxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data);
  }
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (!error.response) {
    throw new Error(responseErrorStrings.UNKNOWN_ERROR);
  }
  if (error.response.status === 401) {
    await deleteToken();
    navigate('Logout');
  }
  if (!error.response.data.code) {
    throw new Error(responseErrorStrings.UNKNOWN_ERROR);
  }
  if (!Object.prototype.hasOwnProperty.call(responseErrorStrings, error.response.data.code)) {
    throw new Error(responseErrorStrings.UNKNOWN_ERROR);
  }
  const response: ResponseError = error.response.data;
  throw new Error(responseErrorStrings[response.code]);
};

client.interceptors.request.use(handleHeader, (error:AxiosError) => Promise.reject(error));
client.interceptors.response.use(onResponse, onResponseError);

const {
  get, post, patch, delete: destroy,
} = client;
export {
  get, post, patch, destroy,
};
