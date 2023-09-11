import {IMarketplaceInputFilter} from '@app/definitions/TMarketplace';
import {Action} from 'redux';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';

export type TMKPFilter =
  | 'MKP_SET_PROPERTY_TYPE'
  | 'MKP_SET_LISTING_STATUS'
  | 'MKP_SET_MIN_PRICE'
  | 'MKP_SET_MAX_PRICE'
  | 'MKP_SET_IS_TRIGGER'
  | 'MKP_SET_SORT_BY'
  | 'MKP_SET_DATA_INPUT'
  | 'MKP_SET_RETURN_COORDINATE'
  | 'MKP_ON_RESET_ALL'
  | 'MKP_SET_KEYWORD'
  | 'MKP_SET_ACTIVE_TAB'
  | 'MKP_SET_DATA_FULL_MAP'
  | 'MKP_SET_BOUNDING_BOX'
  | 'MKP_SET_FOR_LEASE'
  | 'MKP_SET_FOR_SALE'
  | 'MKP_SET_FILTER_HOUSE_STATUS';

export type TMKPActiveTab = 0 | 1 | 2;

export interface IActionMKPSetDataFullMap extends Action<TMKPFilter> {
  payload: {
    dataPin: IRPGetListFavoriteListing[];
  };
}

export interface IActionMKPSetActiveTab extends Action<TMKPFilter> {
  payload: {
    activeTab: TMKPActiveTab;
  };
}

export interface IActionMKPSetProperty extends Action<TMKPFilter> {
  payload: {
    propertyType: string[];
  };
}

export interface IActionMKPSetForLease extends Action<TMKPFilter> {
  payload: {
    forLease: string[];
  };
}

export interface IActionMKPSetForSale extends Action<TMKPFilter> {
  payload: {
    forSale: string[];
  };
}

export interface IActionMKPSetFilterHouseStatus extends Action<TMKPFilter> {
  payload: {
    filterHouseStatus: string[];
  };
}

export interface IActionMKPSetListingStatus extends Action<TMKPFilter> {
  payload: {
    listingStatus: string[];
  };
}

export interface IActionMKPSetMinPrice extends Action<TMKPFilter> {
  payload: {
    minPrice: string;
  };
}

export interface IActionMKPSetMaxPrice extends Action<TMKPFilter> {
  payload: {
    maxPrice: string;
  };
}

export interface IActionMKPSetIsTrigger extends Action<TMKPFilter> {
  payload: {
    isTrigger: boolean;
  };
}

export interface IActionMKPSetSortBy extends Action<TMKPFilter> {
  payload: {
    sortBy: string;
  };
}

export interface IActionMKPSetDataInput extends Action<TMKPFilter> {
  payload: {
    dataInput: IMarketplaceInputFilter;
  };
}

export interface IActionMKPSetBoundingBox extends Action<TMKPFilter> {
  payload: {
    box: string;
  };
}

export interface IActionMKPSetReturnCoordinate extends Action<TMKPFilter> {
  payload: {
    returnCoordinate: number[];
  };
}

export interface IActionMKPOnResetAll extends Action<TMKPFilter> {
  payload: Record<string, unknown>;
}

export interface IActionMKPSetKeyword extends Action<TMKPFilter> {
  payload: {
    searchText: string;
  };
}

export type TActionsMKPFilter = IActionMKPSetProperty &
  IActionMKPSetListingStatus &
  IActionMKPSetMinPrice &
  IActionMKPSetMaxPrice &
  IActionMKPSetIsTrigger &
  IActionMKPSetSortBy &
  IActionMKPSetDataInput &
  IActionMKPSetReturnCoordinate &
  IActionMKPOnResetAll &
  IActionMKPSetKeyword &
  IActionMKPSetActiveTab &
  IActionMKPSetDataFullMap &
  IActionMKPSetBoundingBox &
  IActionMKPSetForLease &
  IActionMKPSetForSale &
  IActionMKPSetFilterHouseStatus;

export type TMKPFilterState = {
  sortBy?: string;
  priceMin?: string;
  priceMax?: string;
  searchText?: string;
  isTrigger?: boolean;
  propertyType?: string[];
  listingStatus?: string[];
  activeTab: TMKPActiveTab;
  returnCoordinate?: number[];
  listCoordinates: number[][];
  dataInput: IMarketplaceInputFilter;
  dataPin: IRPGetListFavoriteListing[];
  box?: string;
  forLease?: string[];
  forSale?: string[];
  filterHouseStatus?: string[];
};
