import AxiosClient from '@app/config/AxiosClient';
import {IGetListNotificationPayload} from '@app/definitions/TApi';
import {
  INotification,
  INotificationChild,
} from '@app/definitions/TNotification';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const getList = async (
  payload: IGetListNotificationPayload,
): Promise<IResponse<INotification[]>> => {
  return AxiosClient.get(domain.notificationManagement.list, {params: payload});
};

const onRead = async (payload: {
  id: string;
}): Promise<IResponse<INotificationChild>> => {
  return AxiosClient.put(domain.notificationManagement.read, payload);
};

const getTotalUnread = async (): Promise<IResponse<number>> => {
  return AxiosClient.get(domain.notificationManagement.totalUnread);
};

export default {
  getList,
  onRead,
  getTotalUnread,
};
