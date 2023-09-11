import AxiosClient from '@app/config/AxiosClient';
import {IRPAddFavourite, IRPGetListFavorite} from '@app/definitions/TApi';
import {IResponse, IRQMeta} from '@app/definitions/TResponse';
import domain from './domain';

const addFavorite = async (
  listingId: string,
): Promise<IResponse<IRPAddFavourite>> => {
  return AxiosClient.post(domain.favoriteManagement.favorite, {
    listingId: listingId,
  });
};

const getListFavourite = async (
  payload: Partial<IRQMeta>,
): Promise<IResponse<IRPGetListFavorite[]>> => {
  return AxiosClient.get(domain.favoriteManagement.favorite, {
    params: payload,
  });
};

const deleteFavorite = async (id: string): Promise<IResponse<boolean>> => {
  return AxiosClient.delete(domain.favoriteManagement.deleteFavorite(id));
};

export default {
  addFavorite,
  getListFavourite,
  deleteFavorite,
};
