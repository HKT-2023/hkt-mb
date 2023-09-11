import AxiosClient from '@app/config/AxiosClient';
import {
  ILoginPayload,
  ILoginResponse,
  IRQGoogleLogin,
  IRQAppleLogin,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const login = async (
  payload: ILoginPayload,
): Promise<IResponse<ILoginResponse>> => {
  return AxiosClient.post(domain.authentication.login, payload);
};

const googleLogin = async (
  payload: IRQGoogleLogin,
): Promise<IResponse<ILoginResponse>> => {
  return AxiosClient.post(domain.authentication.googleLogin, payload);
};

const appleLogin = async (
  payload: IRQAppleLogin,
): Promise<IResponse<ILoginResponse>> => {
  return AxiosClient.post(domain.authentication.appleLogin, payload);
};

export default {
  login,
  googleLogin,
  appleLogin,
};
