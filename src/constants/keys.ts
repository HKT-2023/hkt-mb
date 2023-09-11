import {IRPViewNFTDetail} from '../definitions/TApi';
import {EmptyComponent} from 'react-native-gin-boilerplate';

export function keyExtractor<T>(_: T, index: number) {
  return index.toString();
}

export const THEME_PREFERENCES_KEY = 'THEME_PREFERENCES_KEY';

export const THE_FIRST_INSTALL_KEY = 'THE_FIRST_INSTALL_KEY';

export const MAX_PRICE = 1000000000;
export const MAX_PRICE_MKP = 10000000;
export const MIN_PRICE = 0;

export const DEFAULT_STORAGE_FILE = 'RealiFiStore';

export const ASCII_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const LIMIT = 10;

export const sortByFormat = (sortBy: string, userLocation: number[]) => {
  switch (sortBy) {
    case 'Newest':
      return {
        sortBy: 'listingContractDate',
        order: 'desc',
      };
    case 'Nearest':
      return {
        search: userLocation.toString(),
      };
    case 'Recommended':
      return {
        isRecommend: true,
      };
    case 'Price: High To Low':
      return {
        sortBy: 'price',
        order: 'desc',
      };
    case 'Price: Low To High':
      return {
        sortBy: 'price',
        order: 'asc',
      };
    case 'Square feet: High To Low':
      return {
        sortBy: 'squareFt',
        order: 'desc',
      };
    case 'Square feet: Low To High':
      return {
        sortBy: 'squareFt',
        order: 'asc',
      };
  }
};

export const defaultFlatListProps = {
  keyExtractor: keyExtractor,
  showsVerticalScrollIndicator: false,
  scrollEventThrottle: 16,
  onEndReachedThreshold: 0.9,
  ListEmptyComponent: EmptyComponent,
  contentContainerStyle: {flexGrow: 1},
};

export const defaultFlatListHorizontalProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
};

export const EmptyNFTItem: IRPViewNFTDetail = {
  _id: '',
  createdAt: '',
  updatedAt: '',
  userId: '',
  propertyAddress: '',
  salesPrice: 0,
  salesDate: '',
  theListDate: '',
  endDate: '',
  salesType: {
    key: 'sellFixedPrice',
    title: '',
  },
  price: 0,
  point: 0,
  winningPrice: 0,
  agentName: '',
  __v: 0,
  images: '',
  listingId: '',
  nftType: 'buyer',
  salesHistory: [{walletAddress: '', walletOwner: '', price: 0}],
  sellingConfigId: '',
  ownerName: '',
};

// emit
export const EMIT_FORCE_UPDATE_PERCENT = 'EMIT_FORCE_UPDATE_PERCENT';
export const CHANGE_TAB_REAL_ESTATE = 'CHANGE_TAB_REAL_ESTATE';
export const FORCE_UPDATE_LIST_VIDEO = 'FORCE_UPDATE_LIST_VIDEO';
export const FORCE_UPDATE_LIST_EBOOK = 'FORCE_UPDATE_LIST_EBOOK';
export const FORCE_UPDATE_QUIZ_PROGRESS = 'FORCE_UPDATE_QUIZ_PROGRESS';
export const FORCE_UPDATE_PROGRESS_IN_LIST = 'FORCE_UPDATE_PROGRESS_IN_LIST';
export const EMIT_USER_COURSE = 'EMIT_USER_COURSE';
export const EMIT_REMOVE_FAVORITE_MKP = 'EMIT_REMOVE_FAVORITE_MKP';
export const EMIT_UPDATE_RATING = 'EMIT_UPDATE_RATING';

export const EMIT_FORCE_UPDATE_LISTING = 'EMIT_FORCE_UPDATE_LISTING';
