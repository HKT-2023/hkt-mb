import {IUser} from '../definitions/TUser';
import {TActionsAuth} from './types/TAuth';
import {TActionsUser} from './types/TUser';
import AppAction from './actions/AppAction';
import {store} from './store/configureStore';
import AuthAction from './actions/AuthAction';
import UserAction from './actions/UserAction';
import {TActionsMKPFilter, TMKPActiveTab} from './types/TMKPFilter';
import MKPFilterAction from './actions/MKPFilterAction';
import {
  ILoginPayload,
  ILoginResponse,
  IRPGetListFavoriteListing,
} from '@app/definitions/TApi';
import {IMarketplaceInputFilter} from '@app/definitions/TMarketplace';

const loginDispatch = (payload: ILoginPayload) =>
  store.dispatch(AuthAction.loginRequest(payload) as TActionsAuth);

const logout = () => store.dispatch(AuthAction.logout() as TActionsAuth);

const setFirstInstall = (payload: boolean) =>
  store.dispatch(AppAction.setFirstInstall(payload));

const getUserInfor = () =>
  store.dispatch(UserAction.userInforRequest() as TActionsUser);

const getUserInforSuccess = (user: IUser) =>
  store.dispatch(UserAction.userInforSuccess(user) as TActionsUser);

const loginSuccess = (payload: ILoginResponse) =>
  store.dispatch(AuthAction.loginSuccess(payload) as TActionsAuth);

const requestTotalUnreadNotify = () =>
  store.dispatch(UserAction.totalUnreadRequest() as TActionsUser);

const totalUnreadNotifySuccess = (total: number) =>
  store.dispatch(UserAction.totalUnreadSuccess(total) as TActionsUser);

// Listing Dispatch
const mkpOnReset = () =>
  store.dispatch(MKPFilterAction.onResetAll() as TActionsMKPFilter);

const mkpSetKeyword = (searchText: string) =>
  store.dispatch(MKPFilterAction.setKeyword(searchText) as TActionsMKPFilter);

const mkpSetTrigger = (val: boolean) =>
  store.dispatch(MKPFilterAction.setIsTrigger(val) as TActionsMKPFilter);

const mkpSetMinPrice = (minPrice: string) =>
  store.dispatch(MKPFilterAction.setMinPrice(minPrice) as TActionsMKPFilter);

const mkpSetMaxPrice = (maxPrice: string) =>
  store.dispatch(MKPFilterAction.setMaxPrice(maxPrice) as TActionsMKPFilter);

const mkpSetDataInput = (dataInput: IMarketplaceInputFilter) =>
  store.dispatch(MKPFilterAction.setDataInput(dataInput) as TActionsMKPFilter);

const mkpSetPropertyType = (propertyType: string[]) =>
  store.dispatch(
    MKPFilterAction.setProperty(propertyType) as TActionsMKPFilter,
  );

const mkpSetForLease = (forLease: string[]) =>
  store.dispatch(MKPFilterAction.setForLease(forLease) as TActionsMKPFilter);

const mkpSetForSale = (forSale: string[]) =>
  store.dispatch(MKPFilterAction.setForSale(forSale) as TActionsMKPFilter);

const mkpSetFilterHouseStatus = (filterHouseStatus: string[]) =>
  store.dispatch(
    MKPFilterAction.setFilterHouseStatus(
      filterHouseStatus,
    ) as TActionsMKPFilter,
  );

const mkpSetListingStatus = (listingStatus: string[]) =>
  store.dispatch(
    MKPFilterAction.setListingStatus(listingStatus) as TActionsMKPFilter,
  );

const mkpSetSortBy = (sortBy: string) =>
  store.dispatch(MKPFilterAction.setSortBy(sortBy) as TActionsMKPFilter);

const mkpSetReturnCoordinate = (returnCoordinate: number[]) =>
  store.dispatch(
    MKPFilterAction.setReturnCoordinate(returnCoordinate) as TActionsMKPFilter,
  );
const mkpSetActiveTab = (activeTab: TMKPActiveTab) =>
  store.dispatch(MKPFilterAction.setActiveTab(activeTab) as TActionsMKPFilter);
const mkpSetBoundingBox = (box: string) =>
  store.dispatch(MKPFilterAction.setBoundingBox(box) as TActionsMKPFilter);

const mkpSetDataFullMap = (dataPin: IRPGetListFavoriteListing[]) =>
  store.dispatch(MKPFilterAction.setDataFullMap(dataPin) as TActionsMKPFilter);

export default {
  logout,
  mkpOnReset,
  loginSuccess,
  mkpSetSortBy,
  getUserInfor,
  mkpSetTrigger,
  mkpSetKeyword,
  loginDispatch,
  mkpSetMinPrice,
  mkpSetMaxPrice,
  setFirstInstall,
  mkpSetDataInput,
  mkpSetActiveTab,
  mkpSetDataFullMap,
  mkpSetBoundingBox,
  mkpSetPropertyType,
  getUserInforSuccess,
  mkpSetListingStatus,
  mkpSetReturnCoordinate,
  requestTotalUnreadNotify,
  totalUnreadNotifySuccess,
  mkpSetForLease,
  mkpSetForSale,
  mkpSetFilterHouseStatus,
};
