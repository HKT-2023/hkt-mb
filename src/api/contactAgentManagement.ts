import AxiosClient from '@app/config/AxiosClient';
import domain from './domain';
import {IContactAgentPayload} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';

const contactAgent = async (
  payload: IContactAgentPayload,
): Promise<IResponse<object>> => {
  return AxiosClient.post(domain.contactAgentManagement.contactAgent, payload);
};

export default {
  contactAgent,
};
