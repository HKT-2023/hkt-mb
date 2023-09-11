import domain from './domain';
import AxiosClient from '@app/config/AxiosClient';
import {IResponse} from '../definitions/TResponse';
import {IRPListActivity, IRQListActivity} from '../definitions/TApi';

const listActivity = async (
  payload: IRQListActivity,
): Promise<IResponse<IRPListActivity[]>> => {
  return AxiosClient.get(domain.activityManagement.listActivity, {
    params: payload,
  });
};

const activityDetail = async (
  id: string,
): Promise<IResponse<IRPListActivity>> => {
  return AxiosClient.get(domain.activityManagement.activityDetail(id));
};

export default {
  listActivity,
  activityDetail,
};
