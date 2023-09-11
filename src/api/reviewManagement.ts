import AxiosClient from '@app/config/AxiosClient';
import {
  IRPGetReview,
  IRQAverageRating,
  IRQCreateReview,
  IRQEditReview,
  IRQGetReview,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const averageRating = (
  payload: IRQAverageRating,
): Promise<IResponse<number>> => {
  return AxiosClient.get(domain.reviewManagement.averageRating, {
    params: payload,
  });
};

const editReview = (
  id: string,
  params: IRQEditReview,
): Promise<IResponse<object>> => {
  return AxiosClient.put(domain.reviewManagement.editReview(id), params);
};

const createReview = (
  payload: IRQCreateReview,
): Promise<IResponse<{_id: string}>> => {
  return AxiosClient.post(domain.reviewManagement.createReview, payload);
};

const getReview = (
  params: IRQGetReview,
): Promise<IResponse<IRPGetReview[]>> => {
  return AxiosClient.get(domain.reviewManagement.getReview, {params});
};

const myRating = (
  params: IRQAverageRating,
): Promise<IResponse<number | null>> => {
  return AxiosClient.get(domain.reviewManagement.myRating, {params});
};

export default {
  averageRating,
  editReview,
  createReview,
  getReview,
  myRating,
};
