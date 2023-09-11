import AxiosClient from '../config/AxiosClient';
import {
  IRPGetInterestAreaItem,
  IRPGetListFavoriteListing,
  IRPGetUserEstimation,
  IRPPropertyType,
  IRPSearchLocationItem,
  IRQAddInterestArea,
  IRQGetListing,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const addInterestArea = async (
  payload: IRQAddInterestArea,
): Promise<IResponse<string>> => {
  return AxiosClient.post(domain.listing.addInterestArea, payload);
};

const searchLocation = async (
  locationOrZipcode: string,
): Promise<IResponse<IRPSearchLocationItem[]>> => {
  return AxiosClient.get(domain.listing.searchLocation(locationOrZipcode));
};

const getInterestArea = async (): Promise<
  IResponse<IRPGetInterestAreaItem[]>
> => {
  return AxiosClient.get(domain.listing.getInterestArea);
};

const deleteInterestArea = async (
  mapboxId: string,
): Promise<IResponse<IRPGetInterestAreaItem[]>> => {
  return AxiosClient.delete(domain.listing.deleteInterestArea(mapboxId));
};

const getListing = async (
  payload: IRQGetListing,
): Promise<IResponse<IRPGetListFavoriteListing[]>> => {
  return AxiosClient.get(domain.listing.getListing, {
    params: payload,
  });
};

const listingDetail = async (
  id: string,
): Promise<IResponse<IRPGetListFavoriteListing>> => {
  return AxiosClient.get(domain.listing.listingDetail(id));
};

const checkEstimation = async (
  id: string,
): Promise<IResponse<IRPGetUserEstimation>> => {
  return AxiosClient.get(domain.listing.checkEstimation(id));
};

const getPropertyType = async (): Promise<IResponse<IRPPropertyType>> => {
  return AxiosClient.get(domain.listing.getPropertyType);
};

export default {
  addInterestArea,
  searchLocation,
  getInterestArea,
  deleteInterestArea,
  getListing,
  listingDetail,
  checkEstimation,
  getPropertyType,
};
