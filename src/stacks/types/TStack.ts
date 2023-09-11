import {TUserStackParamList} from '@app/stacks/types/TUserStack';
import {THomeStackParamList} from '@app/stacks/types/THomeStack';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TBottomStackParamList} from '@app/stacks/types/TBottomBar';
import {TWalletStackParamList} from '@app/stacks/types/TWalletStack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TExchangeStackParamList} from '@app/stacks/types/TExchangeStack';
import {TMarketplaceStackParamList} from '@app/stacks/types/TMarketplaceStack';
import {TAuthenticationStackParamList} from '@app/stacks/types/TAuthentication';
import {TNoFooterStackParamList} from '@app/stacks/types/TNoFooterStack';

export type TRootParamsList = {
  BOTTOM_TAB: Record<string, unknown>;
  AUTHENTICATION_STACK: Record<string, unknown>;
};

export type TGatherStackParamList = TRootParamsList &
  TAuthenticationStackParamList &
  TUserStackParamList &
  TMarketplaceStackParamList &
  THomeStackParamList &
  TWalletStackParamList &
  TExchangeStackParamList &
  TBottomStackParamList &
  TNoFooterStackParamList;

export declare interface IDefaultScreenProps<
  T extends keyof TGatherStackParamList,
> {
  navigation: BottomTabNavigationProp<TGatherStackParamList, T>;
  route: RouteProp<TGatherStackParamList, T>;
}

export type IBottomStackProps = IDefaultScreenProps<'BOTTOM_TAB'>;

export type TNavigation = NavigationProp<
  TGatherStackParamList,
  keyof TGatherStackParamList
>;

export type TRouteNavigation<T extends keyof TGatherStackParamList> = RouteProp<
  TGatherStackParamList,
  T
>;
