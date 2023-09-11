import domain from './domain';
import AxiosClient from '@app/config/AxiosClient';
import {IResponse} from '@app/definitions/TResponse';
import {
  IRPBuyNFTFixedPrice,
  IRPCancelOffer,
  IRPConfigAuction,
  IRPConfigOffer,
  IRPConfigSell,
  IRPEstimateFee,
  IRPListBid,
  IRPListOffer,
  IRPListOfferOffer,
  IRPListSale,
  IRQConfigAuction,
  IRQConfigOffer,
  IRQConfigSell,
  IRQListOffer,
  IRQMakeOffer,
  IRQNFTMarketplace,
} from '@app/definitions/TApi';
import {INFTExchange} from '@app/definitions/INFTs';

const getNFTMarketplace = async (
  params: IRQNFTMarketplace,
): Promise<IResponse<INFTExchange[]>> => {
  return AxiosClient.get(domain.nft.NFTMarketPlace, {params});
};

const buyNFTFixedPrice = async (
  NFTSellingConfig: string,
): Promise<IResponse<IRPBuyNFTFixedPrice>> => {
  return AxiosClient.post(domain.nft.buyNFTFixedPrice, {NFTSellingConfig});
};

const configSell = async (
  payload: IRQConfigSell,
): Promise<IResponse<IRPConfigSell>> => {
  return AxiosClient.post(domain.nft.configSell, payload);
};

const configOffer = async (
  payload: IRQConfigOffer,
): Promise<IResponse<IRPConfigOffer>> => {
  return AxiosClient.post(domain.nft.configOffer, payload);
};

const configAuction = async (
  payload: IRQConfigAuction,
): Promise<IResponse<IRPConfigAuction>> => {
  return AxiosClient.post(domain.nft.configAuction, payload);
};

const listOffers = async (
  payload: IRQListOffer,
): Promise<IResponse<IRPListOffer[]>> => {
  return AxiosClient.get(domain.nft.listOffers, {
    params: payload,
  });
};

const makeOffer = async (
  payload: IRQMakeOffer,
): Promise<IResponse<IRPListOfferOffer>> => {
  return AxiosClient.post(domain.nft.makeOffer, payload);
};

const makeBid = async (
  payload: IRQMakeOffer,
): Promise<IResponse<IRPListOfferOffer>> => {
  return AxiosClient.post(domain.nft.makeBid, payload);
};

const listBid = async (
  payload: IRQListOffer,
): Promise<IResponse<IRPListBid[]>> => {
  return AxiosClient.get(domain.nft.listBid, {
    params: payload,
  });
};

const listSale = async (
  payload: IRQListOffer,
): Promise<IResponse<IRPListSale[]>> => {
  return AxiosClient.get(domain.nft.listSale, {
    params: payload,
  });
};

const cancelOffer = async (
  offerId: string,
): Promise<IResponse<IRPCancelOffer>> => {
  return AxiosClient.put(domain.nft.cancelOffer, {offerId});
};

const approveOffer = async (offerId: string): Promise<IResponse<object>> => {
  return AxiosClient.put(domain.nft.approveOffer, {offerId});
};

const cancelConfig = async (
  sellingConfigId: string,
): Promise<IResponse<object>> => {
  return AxiosClient.put(domain.nft.cancelConfig, {sellingConfigId});
};

const endAuction = async (
  sellingConfigId: string,
): Promise<IResponse<object>> => {
  return AxiosClient.put(domain.nft.endAuction, {sellingConfigId});
};

const estimateFee = async (): Promise<IResponse<IRPEstimateFee>> => {
  return AxiosClient.get(domain.nft.estimateFee);
};

export default {
  getNFTMarketplace,
  buyNFTFixedPrice,
  configSell,
  configOffer,
  configAuction,
  listOffers,
  makeOffer,
  makeBid,
  listBid,
  listSale,
  cancelOffer,
  approveOffer,
  cancelConfig,
  endAuction,
  estimateFee,
};
