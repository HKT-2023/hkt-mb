import AxiosClient from '@app/config/AxiosClient';
import {
  IRPHedera,
  IRPMyWallet,
  IRPSendToken,
  IRPSendNFT,
  IRPViewNFT,
  IRPViewNFTDetail,
  IRQSendToken,
  IRQSendNFT,
  IRQViewNFT,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';
import Config from 'react-native-config';

const myWallet = async (): Promise<IResponse<IRPMyWallet>> => {
  return AxiosClient.get(domain.wallet.myWallet);
};

const viewListNFT = async (
  payload: IRQViewNFT,
): Promise<IResponse<IRPViewNFT[]>> => {
  return AxiosClient.get(domain.wallet.viewNFT, {
    params: payload,
  });
};

const viewNFTDetail = async (
  id: string,
): Promise<IResponse<IRPViewNFTDetail>> => {
  return AxiosClient.get(domain.wallet.viewNFTDetail(id));
};

const getBalance = async (accountId: string): Promise<IRPHedera> => {
  return AxiosClient.get(`/api/v1/balances?account.id=${accountId}`, {
    baseURL: Config.URL_HEDERA,
  });
};

const sendToken = async (payload: IRQSendToken): Promise<IRPSendToken> => {
  return AxiosClient.post(domain.wallet.sendToken, payload);
};

const sendNFT = async (payload: IRQSendNFT): Promise<IResponse<IRPSendNFT>> => {
  return AxiosClient.post(domain.wallet.sendNFT, payload);
};

export default {
  myWallet,
  viewListNFT,
  viewNFTDetail,
  getBalance,
  sendToken,
  sendNFT,
};
