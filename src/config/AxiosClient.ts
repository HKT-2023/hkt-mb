import queryString from 'query-string';
import Config from 'react-native-config';
import Dispatch from '@app/redux/Dispatch';
import axios, {AxiosRequestConfig} from 'axios';
import UNavigation from '@app/utils/UNavigation';
import {Logger} from 'react-native-gin-boilerplate';
import {store} from '@app/redux/store/configureStore';

const baseURL = Config.API_URL;
let retryObj = {
  num: 1,
  url: '',
};

const defaultConfig: AxiosRequestConfig = {
  baseURL,
  timeout: 20000,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    'Content-Type': 'application/json',
    accept: '*/*',
  },
  paramsSerializer: params => queryString.stringify(params),
};

const AxiosClient = axios.create(defaultConfig);

AxiosClient.interceptors.request.use(
  async config => {
    Logger.info('config: ', config);
    let token = '';
    try {
      const accessToken = store.getState().AuthReducer.jwtAccessToken;
      if (accessToken !== null) {
        token = accessToken as string;
      }
    } catch (error) {
      Logger.error('Can not read token, ', error);
    }
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  response => {
    if (retryObj.url === response.config.url) {
      retryObj = {num: 1, url: response.config.url};
    }
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    Logger.error('Axios Error: ', error);
    if (error.code === 'ECONNABORTED') {
      throw Error('timeout');
    } else if (error.response && error.response.data) {
      const status = error.response.status;
      if (
        status === 404 ||
        status === 400 ||
        status === 403 ||
        status === 406
      ) {
        if (
          error.response.data.data &&
          error.response.data.data?.blockPhoneTime !== undefined
        ) {
          return Promise.reject(error.response.data);
        } else if (error.response.data.message !== undefined) {
          return Promise.reject(error.response.data.message);
        } else if (error.response.message !== undefined) {
          return Promise.reject(error.response.message);
        } else if (
          error.response.data.response !== undefined &&
          error.response.data.response.message !== undefined
        ) {
          return Promise.reject(error.response.data.response.message);
        } else {
          return Promise.reject(error.message);
        }
      } else if (status === 401) {
        retryObj.url = error?.config?.url ?? '';
        if (retryObj.num < 5) {
          retryObj.num += 1;
          return AxiosClient.request(error.config);
        } else {
          Dispatch.logout();
          UNavigation.navigate('AUTHENTICATION_STACK', {
            screen: 'LOGIN_SCREEN',
            params: {},
          });
          if (
            error.response?.data !== undefined &&
            error.response?.data?.response !== undefined &&
            error.response?.data?.response?.message !== undefined
          ) {
            return Promise.reject(error.response.data.response.message);
          } else {
            return Promise.reject(error?.response?.data.message);
          }
        }
      } else if (status === 500 || status === 502) {
        return Promise.reject('Internal Server Error');
      } else {
        return Promise.reject(error.message);
      }
    } else {
      return Promise.reject(error.message);
    }
  },
);

export default AxiosClient;
