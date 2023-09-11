import AxiosClient from '@app/config/AxiosClient';
import {
  ICheckInPayload,
  IEstimatePayload,
  IGetListOfEstimationsPayload,
  IRPGetListEstimation,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const checkIn = async (
  payload: ICheckInPayload,
): Promise<IResponse<boolean>> => {
  return AxiosClient.post(domain.houseEstimation.checkIn, payload);
};

const estimate = async (
  payload: IEstimatePayload,
): Promise<IResponse<object>> => {
  return AxiosClient.post(domain.houseEstimation.estimate, payload);
};

const getListOfEstimations = async (
  payload: IGetListOfEstimationsPayload,
): Promise<IResponse<IRPGetListEstimation[]>> => {
  return AxiosClient.get(domain.houseEstimation.listOfEstimations, {
    params: payload,
  });
};

export default {
  checkIn,
  estimate,
  getListOfEstimations,
};
