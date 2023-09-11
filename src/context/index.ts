import React from 'react';
import {
  IUpdateUserPayload,
  IUpdateAgentUserPayload,
  IUpdateVendorUserPayload,
  IRPGetListFavoriteListing,
} from '@app/definitions/TApi';
import {INFTSortBy} from '@app/definitions/TFilter';
import {TButtonAny} from 'react-native-gin-boilerplate';

export interface IMyNFTContextProps {
  nftSortBy: INFTSortBy | null;
  sellingSortBy: INFTSortBy | null;
  soldSortBy: INFTSortBy | null;
  onChangeNFTSortBy?: TButtonAny<INFTSortBy>;
  onChangeSellingSortBy?: TButtonAny<INFTSortBy>;
  onChangeSoldSortBy?: TButtonAny<INFTSortBy>;
  searchText: string;
  isTrigger?: boolean;
  setSearchText?: TButtonAny<string>;
}

export const MyNFTContext = React.createContext<IMyNFTContextProps>({
  nftSortBy: null,
  soldSortBy: null,
  sellingSortBy: null,
  searchText: '',
});

export const useMyNFTContext = (): IMyNFTContextProps =>
  React.useContext(MyNFTContext);

export interface IDetailedUserInformationContextProps {
  userFields?: IUpdateUserPayload;
  agentFields?: IUpdateAgentUserPayload;
  vendorFields?: IUpdateVendorUserPayload;
  onChangeUserFields?: TButtonAny<IUpdateUserPayload>;
  onChangeAgentFields?: TButtonAny<IUpdateAgentUserPayload>;
  onChangeVendorFields?: TButtonAny<IUpdateVendorUserPayload>;
}

export const DetailedUserInformationContext =
  React.createContext<IDetailedUserInformationContextProps>({
    userFields: {firstName: '', lastName: '', phone: ''},
    agentFields: {
      phone: '',
      license: '',
      lastName: '',
      firstName: '',
      agentName: '',
      agentEmail: '',
    },
    vendorFields: {
      phone: '',
      license: '',
      lastName: '',
      firstName: '',
      vendorType: [],
      vendorEmail: '',
      businessName: '',
      vendorLocation: '',
      primaryContact: '',
    },
  });

export const useDetailedUserInformationContext =
  (): IDetailedUserInformationContextProps =>
    React.useContext(DetailedUserInformationContext);

export interface IRealEstateDetailContextProps {
  item: IRPGetListFavoriteListing | undefined;
}
export const RealEstateDetailContext =
  React.createContext<IRealEstateDetailContextProps>({
    item: undefined,
  });

export const useRealEstateDetailContext = (): IRealEstateDetailContextProps =>
  React.useContext(RealEstateDetailContext);
