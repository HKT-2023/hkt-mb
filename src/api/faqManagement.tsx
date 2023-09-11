import AxiosClient from '@app/config/AxiosClient';
import {IFAQ} from '@app/definitions/IFAQ';
import {IMeta, IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const getList = async (payload: Partial<IMeta>): Promise<IResponse<IFAQ[]>> => {
  return AxiosClient.get(domain.faqManagement.list, {params: payload});
};

export default {
  getList,
};
