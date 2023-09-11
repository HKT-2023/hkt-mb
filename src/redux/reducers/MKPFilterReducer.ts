import mNumber from '@app/utils/methods/mNumber';
import {MAX_PRICE_MKP, MIN_PRICE} from '@app/constants/keys';
import {TActionsMKPFilter, TMKPFilterState} from '../types/TMKPFilter';

const initialState: TMKPFilterState = {
  dataPin: [],
  listCoordinates: [],
  activeTab: 0,
  searchText: '',
  propertyType: [],
  listingStatus: ['Active'],
  dataInput: {
    bed: '',
    bath: '',
    sqft: '',
    lotSqft: '',
    hoaAmount: '',
    stories: '',
    parkingSpots: '',
    unit: '',
    daysOnMarket: '',
    yearBuilt: '',
  },
  priceMax: mNumber.formatBidValue(String(MAX_PRICE_MKP), false) + '+',
  priceMin: mNumber.formatBidValue(String(MIN_PRICE), false),
  isTrigger: false,
  sortBy: 'Newest',
  returnCoordinate: [],
  box: '',
  forLease: [],
  forSale: [],
  filterHouseStatus: [],
};

function MKPFilterReducer(
  state = initialState,
  action: TActionsMKPFilter,
): TMKPFilterState {
  switch (action.type) {
    case 'MKP_SET_DATA_FULL_MAP':
      return {
        ...state,
        dataPin: action.payload.dataPin,
        listCoordinates: action.payload.dataPin.map(e => [
          e.longitude,
          e.latitude,
        ]),
      };
    case 'MKP_SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload.activeTab,
      };
    case 'MKP_SET_PROPERTY_TYPE':
      return {
        ...state,
        propertyType: action.payload.propertyType,
      };
    case 'MKP_SET_FOR_LEASE':
      return {
        ...state,
        forLease: action.payload.forLease,
      };
    case 'MKP_SET_FOR_SALE':
      return {
        ...state,
        forSale: action.payload.forSale,
      };
    case 'MKP_SET_FILTER_HOUSE_STATUS':
      return {
        ...state,
        filterHouseStatus: action.payload.filterHouseStatus,
      };
    case 'MKP_SET_LISTING_STATUS':
      return {
        ...state,
        listingStatus: action.payload.listingStatus,
      };
    case 'MKP_SET_MIN_PRICE':
      return {
        ...state,
        priceMin: action.payload.minPrice,
      };
    case 'MKP_SET_MAX_PRICE':
      return {
        ...state,
        priceMax: action.payload.maxPrice,
      };
    case 'MKP_SET_IS_TRIGGER':
      return {
        ...state,
        isTrigger: action.payload.isTrigger,
      };
    case 'MKP_SET_DATA_INPUT':
      return {
        ...state,
        dataInput: action.payload.dataInput,
      };
    case 'MKP_SET_RETURN_COORDINATE':
      return {
        ...state,
        returnCoordinate: action.payload.returnCoordinate,
      };
    case 'MKP_SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload.sortBy,
      };
    case 'MKP_SET_KEYWORD':
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    case 'MKP_SET_BOUNDING_BOX':
      return {
        ...state,
        box: action.payload.box,
      };
    case 'MKP_ON_RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

export default MKPFilterReducer;
