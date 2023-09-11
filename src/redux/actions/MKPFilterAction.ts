import {IMarketplaceInputFilter} from '@app/definitions/TMarketplace';
import {
  IActionMKPOnResetAll,
  IActionMKPSetActiveTab,
  IActionMKPSetBoundingBox,
  IActionMKPSetDataFullMap,
  IActionMKPSetDataInput,
  IActionMKPSetIsTrigger,
  IActionMKPSetKeyword,
  IActionMKPSetListingStatus,
  IActionMKPSetMaxPrice,
  IActionMKPSetMinPrice,
  IActionMKPSetProperty,
  IActionMKPSetReturnCoordinate,
  IActionMKPSetSortBy,
  IActionMKPSetForLease,
  IActionMKPSetForSale,
  TMKPActiveTab,
  IActionMKPSetFilterHouseStatus,
} from '../types/TMKPFilter';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';

function setDataFullMap(
  dataPin: IRPGetListFavoriteListing[],
): IActionMKPSetDataFullMap {
  return {
    type: 'MKP_SET_DATA_FULL_MAP',
    payload: {
      dataPin,
    },
  };
}

function setActiveTab(activeTab: TMKPActiveTab): IActionMKPSetActiveTab {
  return {
    type: 'MKP_SET_ACTIVE_TAB',
    payload: {
      activeTab,
    },
  };
}

function setProperty(propertyType: string[]): IActionMKPSetProperty {
  return {
    type: 'MKP_SET_PROPERTY_TYPE',
    payload: {
      propertyType,
    },
  };
}

function setForLease(forLease: string[]): IActionMKPSetForLease {
  return {
    type: 'MKP_SET_FOR_LEASE',
    payload: {
      forLease,
    },
  };
}

function setForSale(forSale: string[]): IActionMKPSetForSale {
  return {
    type: 'MKP_SET_FOR_SALE',
    payload: {
      forSale,
    },
  };
}

function setFilterHouseStatus(
  filterHouseStatus: string[],
): IActionMKPSetFilterHouseStatus {
  return {
    type: 'MKP_SET_FILTER_HOUSE_STATUS',
    payload: {
      filterHouseStatus,
    },
  };
}

function setListingStatus(listingStatus: string[]): IActionMKPSetListingStatus {
  return {
    type: 'MKP_SET_LISTING_STATUS',
    payload: {
      listingStatus,
    },
  };
}

function setMinPrice(minPrice: string): IActionMKPSetMinPrice {
  return {
    type: 'MKP_SET_MIN_PRICE',
    payload: {
      minPrice,
    },
  };
}

function setMaxPrice(maxPrice: string): IActionMKPSetMaxPrice {
  return {
    type: 'MKP_SET_MAX_PRICE',
    payload: {maxPrice},
  };
}

function setIsTrigger(isTrigger: boolean): IActionMKPSetIsTrigger {
  return {
    type: 'MKP_SET_IS_TRIGGER',
    payload: {isTrigger},
  };
}

function setSortBy(sortBy: string): IActionMKPSetSortBy {
  return {
    type: 'MKP_SET_SORT_BY',
    payload: {sortBy},
  };
}

function setDataInput(
  dataInput: IMarketplaceInputFilter,
): IActionMKPSetDataInput {
  return {
    type: 'MKP_SET_DATA_INPUT',
    payload: {dataInput},
  };
}

function setBoundingBox(box: string): IActionMKPSetBoundingBox {
  return {
    type: 'MKP_SET_BOUNDING_BOX',
    payload: {box},
  };
}

function setReturnCoordinate(
  returnCoordinate: number[],
): IActionMKPSetReturnCoordinate {
  return {
    type: 'MKP_SET_RETURN_COORDINATE',
    payload: {returnCoordinate},
  };
}

function onResetAll(): IActionMKPOnResetAll {
  return {
    type: 'MKP_ON_RESET_ALL',
    payload: {},
  };
}

function setKeyword(searchText: string): IActionMKPSetKeyword {
  return {
    type: 'MKP_SET_KEYWORD',
    payload: {searchText},
  };
}

export default {
  setSortBy,
  onResetAll,
  setKeyword,
  setProperty,
  setMinPrice,
  setMaxPrice,
  setDataInput,
  setIsTrigger,
  setActiveTab,
  setBoundingBox,
  setDataFullMap,
  setListingStatus,
  setReturnCoordinate,
  setForLease,
  setForSale,
  setFilterHouseStatus,
};
