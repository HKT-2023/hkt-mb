import React from 'react';
import {SvgProps} from 'react-native-svg';
import {useTheme} from 'react-native-gin-boilerplate';
import {TBottomStackParamList} from '../types/TBottomBar';
import {
  IcUser,
  IcHouse,
  IcWallet,
  IcListing,
  IcExchange,
} from '@app/assets/svg';

interface IProps {
  routeName: keyof TBottomStackParamList;
  isFocused: boolean;
}

const RenderIcon: React.FC<IProps> = ({routeName, isFocused}) => {
  const {colors} = useTheme();

  const color = isFocused ? colors.activeColor : colors.inactiveColor;

  const iconProps: SvgProps = {
    color,
  };

  switch (routeName) {
    case 'HOME_STACK':
      return <IcHouse {...iconProps} />;
    case 'LISTING_STACK':
      return <IcListing {...iconProps} />;
    case 'EXCHANGE_STACK':
      return <IcExchange {...iconProps} />;
    case 'WALLET_STACK':
      return <IcWallet {...iconProps} />;
    case 'USER_STACK':
      return <IcUser {...iconProps} />;
    default:
      return <React.Fragment />;
  }
};

export default React.memo(RenderIcon);
