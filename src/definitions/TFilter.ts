import {TSaleType} from './TApi';
import {TButtonAny} from 'react-native-gin-boilerplate';

export type TFilterKey = 'PropertyType' | 'ListingStatus' | 'Amenity';

export interface IFilter {
  key: TFilterKey;
  value: string;
  title?: string;
}

export type TNFTSortByKey =
  | 'priceHighToLow'
  | 'priceLowToHigh'
  | 'EndingSoon'
  | 'RecentListed'
  | 'pointHTL'
  | 'pointLTH';

export interface INFTSortBy {
  key: TNFTSortByKey;
  value: string;
}

export type TNFTFilteringKey =
  | 'FixedPrice'
  | 'Auction'
  | 'Offer'
  | 'RecentlyListed';

export interface INFTFiltering {
  key: TSaleType;
  value: string;
}

export interface ISellType {
  key: TSaleType;
  value: string;
  icon: JSX.Element;
}

export interface IPrice {
  fromPrice: number;
  toPrice: number;
}

export interface IMultiSelect {
  value: TSaleType[];
  onChangeValue: TButtonAny<TSaleType>;
}
