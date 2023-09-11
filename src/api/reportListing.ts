import {IRPReportListing, IRQReportListing} from './../definitions/TApi';
import AxiosClient from '../config/AxiosClient';
import {IResponse} from '../definitions/TResponse';
import domain from './domain';

const reportListing = async (
  payload: IRQReportListing,
): Promise<IResponse<IRPReportListing>> => {
  return AxiosClient.post(domain.reportListing.reportListing, payload);
};

export default {
  reportListing,
};
