import AxiosClient from '@app/config/AxiosClient';
import {
  IChangePasswordPayload,
  IResetPasswordPayload,
  IRPAgentHomepage,
  IRPGetAuthHash,
  IRPGetReview,
  IRPLeaderboardUser,
  IRPUserHomepage,
  IRPViewLeaderboard,
  IRQSetExternalId,
  IRQSetUp2FA,
  IRQValidatePhoneCode,
  IRQViewLeaderboard,
  IUpdateAgentUserPayload,
  IUpdateUserPayload,
  IUpdateVendorUserPayload,
  IValidateCodePayload,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import {IUser} from '@app/definitions/TUser';
import domain from './domain';

const getUserInformation = async (): Promise<IResponse<IUser>> => {
  return AxiosClient.get(domain.userManagement.information);
};

const changePassword = async (
  payload: IChangePasswordPayload,
): Promise<IResponse<boolean>> => {
  return AxiosClient.put(domain.userManagement.changePassword, payload);
};

const forgotPassword = async (email: string): Promise<IResponse<boolean>> => {
  return AxiosClient.put(domain.userManagement.forgotPassword(email));
};

const validateCode = async (
  payload: IValidateCodePayload,
): Promise<IResponse<any>> => {
  return AxiosClient.post(domain.userManagement.validateCode, payload);
};

const resetPassword = async (
  payload: IResetPasswordPayload,
): Promise<IResponse<any>> => {
  return AxiosClient.put(domain.userManagement.resetPassword, payload);
};

export const getAuthHash = async (
  payload: IRQSetExternalId,
): Promise<IResponse<IRPGetAuthHash>> => {
  return AxiosClient.post(domain.userManagement.getAuthHash, payload);
};

const onUpdateUser = async (
  payload: IUpdateUserPayload,
): Promise<IResponse<IUser>> => {
  return AxiosClient.put(domain.userManagement.updateUser, payload);
};

const onUpdateAgent = async (
  payload: IUpdateAgentUserPayload,
): Promise<IResponse<IUser>> => {
  return AxiosClient.put(domain.userManagement.updateAgentUser, payload);
};

const onUpdateVendor = async (
  payload: IUpdateVendorUserPayload,
): Promise<IResponse<IUser>> => {
  return AxiosClient.put(domain.userManagement.updateVendorUser, payload);
};

const viewLeaderboard = async (
  params: IRQViewLeaderboard,
): Promise<IResponse<IRPViewLeaderboard>> => {
  return AxiosClient.get(domain.userManagement.viewLeaderboard, {
    params,
  });
};

const viewOtherLeaderboard = async (
  params: IRQViewLeaderboard,
): Promise<IResponse<IRPLeaderboardUser[]>> => {
  return AxiosClient.get(domain.userManagement.viewOtherLeaderboard, {
    params,
  });
};

const setUp2FA = async (payload: IRQSetUp2FA): Promise<IResponse<boolean>> => {
  return AxiosClient.put(domain.userManagement.setUp2FA, payload);
};

const validatePhoneCode = async (
  payload: IRQValidatePhoneCode,
): Promise<IResponse<boolean>> => {
  return AxiosClient.post(domain.userManagement.validatePhoneCode, payload);
};

const sendOtp = async (): Promise<IResponse<object>> => {
  return AxiosClient.post(domain.userManagement.sendOtp);
};

const verifyOtp = async (otpCode: string): Promise<IResponse<object>> => {
  return AxiosClient.post(domain.userManagement.verifyOtp, {otpCode});
};

const agentHomepage = async (
  search?: string,
): Promise<IResponse<IRPAgentHomepage>> => {
  const params = search ? `?search=${search}` : '';
  return AxiosClient.get(`${domain.userManagement.agentHomepage}/${params}`);
};

const userHomepage = async (
  search?: string,
): Promise<IResponse<IRPUserHomepage>> => {
  const params = search ? `?search=${search}` : '';
  return AxiosClient.get(`${domain.userManagement.userHomepage}/${params}`);
};

const vendorHomepage = async (): Promise<IResponse<IRPGetReview[]>> => {
  return AxiosClient.get(domain.userManagement.vendorHomepage);
};

export default {
  sendOtp,
  setUp2FA,
  verifyOtp,
  getAuthHash,
  onUpdateUser,
  userHomepage,
  validateCode,
  agentHomepage,
  onUpdateAgent,
  resetPassword,
  changePassword,
  forgotPassword,
  onUpdateVendor,
  vendorHomepage,
  viewLeaderboard,
  validatePhoneCode,
  getUserInformation,
  viewOtherLeaderboard,
};
