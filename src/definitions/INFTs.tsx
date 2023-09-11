import {IDate} from '@app/utils/methods/mDate';
import {TSaleType} from './TApi';

export interface INFTs {
  points: number;
  address: string;
  photo: number | string;
}

export interface IBid {
  date: IDate;
  name: string;
  points: number;
  photo: string | number;
}

export interface INFT {
  name: string;
  price: string;
  time: string;
}

export type TRouteNFT = 'GENERAL' | 'OFFER' | 'BID' | 'SALE_HISTORY';

export interface INFTRoute {
  key: TRouteNFT;
  title: string;
}

export interface ISalesHistory {
  walletAddress: string;
  walletOwner: string;
  price: number;
}

export interface INFTExchange {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  images: string;
  name: string;
  propertyAddress: string;
  salesPrice: number;
  salesDate: string;
  theListDate: string;
  endDate: string;
  salesType: {
    key: TSaleType;
    title: string;
  };
  price: number;
  point: number;
  winningPrice: number;
  agentName: string;
  customer: string;
  tokenId: number;
  contractAddress: string;
  ownerAccountId: string;
  ownerAddress: string;
  __v: number;
  transactionId: string;
  ownerName: string;
  putSaleTime: string;
  putSaleType: TSaleType;
  saleStatus: string;
  sellingConfigId: string;
}
