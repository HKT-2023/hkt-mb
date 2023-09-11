import AxiosClient from '../config/AxiosClient';
import {IRPRequestTour, IRQRequestTour} from '../definitions/TApi';
import {IResponse} from '../definitions/TResponse';
import domain from './domain';

const requestTour = async (
  payload: IRQRequestTour,
): Promise<IResponse<IRPRequestTour>> => {
  return AxiosClient.post(domain.requestTourManagement.requestTour, payload);
};

export default {
  requestTour,
};
