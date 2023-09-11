import AxiosClient from '@app/config/AxiosClient';
import {
  IRPVendorCategoryDetail,
  IRPVendorList,
  IRPVendorServiceDetail,
  IRQVendorCategory,
  IRQVendorCategoryDetail,
} from '@app/definitions/TApi';
import {IResponse} from '@app/definitions/TResponse';
import domain from './domain';

const vendorCategory = (
  params: IRQVendorCategory,
): Promise<IResponse<IRPVendorList[]>> => {
  return AxiosClient.get(domain.vendorManagement.vendorCategory, {params});
};

const vendorCategoryDetail = (
  params: IRQVendorCategoryDetail,
): Promise<IResponse<IRPVendorCategoryDetail[]>> => {
  return AxiosClient.get(
    domain.vendorManagement.vendorCategoryDetail(params.id),
    {
      params: {
        limit: params.limit,
        page: params.page,
      },
    },
  );
};

const vendorServiceDetail = (
  id: string,
  vendorId: string,
): Promise<IResponse<IRPVendorServiceDetail>> => {
  return AxiosClient.get(
    domain.vendorManagement.vendorServiceDetail(id, vendorId),
  );
};

export default {
  vendorCategory,
  vendorCategoryDetail,
  vendorServiceDetail,
};
