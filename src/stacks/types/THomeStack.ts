import {IDefaultScreenProps} from './TStack';

export type THomeStackParamList = {
  HOME_SCREEN: Record<string, unknown>;
  NFT_MARKET_PLACE_SCREEN: Record<string, unknown>;
};

export type IHomeScreenProps = IDefaultScreenProps<'HOME_SCREEN'>;
export type INFTMarketPlaceScreenProps =
  IDefaultScreenProps<'NFT_MARKET_PLACE_SCREEN'>;
