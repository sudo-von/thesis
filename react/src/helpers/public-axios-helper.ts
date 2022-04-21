import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import responseErrorStrings from 'src/constants/errors';
import { camelizeKeys, decamelizeKeys } from 'humps';
import configuration, { ResponseError } from './axios-helper';

const client:AxiosInstance = axios.create(configuration);

const handleHeader = async (config:AxiosRequestConfig) => {
  const configRequest:AxiosRequestConfig = config;
  configRequest.data = decamelizeKeys(config.data);
  return configRequest;
};

const onResponse = (response: AxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data);
  }
  return response;
};

const handleError = (error:AxiosError): Promise<AxiosError> => {
  if (!error.response) {
    throw new Error(responseErrorStrings.UNKNOWN_ERROR);
  }
  if (!error.response.data.code) {
    throw new Error(responseErrorStrings.ERROR_NOT_IMPLEMENTED);
  }
  if (!Object.prototype.hasOwnProperty.call(responseErrorStrings, error.response.data.code)) {
    throw new Error(responseErrorStrings.ERROR_NOT_IMPLEMENTED);
  }
  const errorResponse:ResponseError = error.response.data;
  throw new Error(responseErrorStrings[errorResponse.code]);
};

client.interceptors.response.use(onResponse, handleError);
client.interceptors.request.use(handleHeader, (error:AxiosError) => Promise.reject(error));

const {
  get, post, patch, delete: destroy,
} = client;
export {
  get, post, patch, destroy,
};
