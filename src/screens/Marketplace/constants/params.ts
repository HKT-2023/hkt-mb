import {LIMIT, MAX_PRICE_MKP, sortByFormat} from '@app/constants/keys';
import {IRQGetListing} from '@app/definitions/TApi';
import {store} from '@app/redux/store/configureStore';
import mNumber from '@app/utils/methods/mNumber';

const listingParams = (
  isRecommend = false,
  userLocation: number[],
  searchByBox = false,
): IRQGetListing => {
  const {
    dataInput,
    priceMax,
    priceMin,
    sortBy,
    listingStatus,
    propertyType,
    returnCoordinate,
    box,
    filterHouseStatus,
    forLease,
    forSale,
    searchText,
  } = store.getState().MKPFilterReducer;

  const houseStatusFormat = (houseStatus?: string[]) => {
    if (houseStatus) {
      return houseStatus?.map(e => {
        switch (e) {
          case 'forLease':
            return Array.from(forLease ?? []).join(',');
          case 'forSale':
            return Array.from(forSale ?? []).join(',');
        }
      });
    } else {
      return [];
    }
  };

  return {
    limit: LIMIT,
    fields:
      'id,location,city,price,photo,numberOfBeds,numberOfBaths,squareFt,price,latitude,longitude,propertySubType',
    ...(!!dataInput.bath && {
      fromBaths: 0,
      toBaths: Number(dataInput.bath),
    }),
    ...(!!dataInput.bed && {
      fromBeds: 0,
      toBeds: Number(dataInput.bed),
    }),
    ...(!!dataInput.daysOnMarket && {
      fromDayOnMarket: 0,
      toDayOnMarket: Number(dataInput.daysOnMarket),
    }),
    ...(!!dataInput.lotSqft && {
      fromLotSizeArea: 0,
      toLotSizeArea: Number(dataInput.lotSqft),
    }),
    ...(!!dataInput.parkingSpots && {
      fromParkings: 0,
      toParkings: Number(dataInput.parkingSpots),
    }),
    ...(!!dataInput.sqft && {
      fromSquareFt: 0,
      toSquareFt: Number(dataInput.sqft),
    }),
    ...(!!dataInput.stories && {
      fromStories: 0,
      toStories: Number(dataInput.stories),
    }),
    ...(!!dataInput.yearBuilt && {
      fromYearBuilt: 0,
      toYearBuilt: Number(dataInput.yearBuilt),
    }),
    ...(!!dataInput.hoaAmount && {hoaAmount: Number(dataInput.hoaAmount)}),
    ...(!!dataInput.unit && {units: Number(dataInput.unit)}),
    ...(!!priceMin && {fromPrice: Number(mNumber.removeComma(priceMin))}),
    ...(!!priceMax &&
      Number(priceMax.replace(/[^0-9]/g, '')) !== MAX_PRICE_MKP && {
        toPrice: Number(priceMax.replace(/[^0-9]/g, '')),
      }),
    ...(!!returnCoordinate?.length && {search: returnCoordinate.toString()}),
    ...(!!sortBy && sortByFormat(sortBy, userLocation)),
    ...(!!listingStatus?.length && {
      listingStatus: Array.from(listingStatus).join(','),
    }),
    ...(!!filterHouseStatus?.length && {
      propertyType: Array.from(houseStatusFormat(filterHouseStatus)).join(','),
    }),
    ...(!!propertyType?.length && {
      propertySubType: Array.from(propertyType).join(','),
    }),
    isRecommend: !!sortBy && sortBy === 'Recommended' ? true : isRecommend,
    ...(searchByBox && !!box && {box: box}),
    ...(!!searchText && {location: searchText}),
  };
};

export default {listingParams};
