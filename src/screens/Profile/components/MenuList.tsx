import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TNavigation} from '@app/stacks/types/TStack';
import {useNavigation} from '@react-navigation/native';
import {TReduxState} from '@app/redux/store/configureStore';
import {
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  ratioW,
  FlexView,
  RowContainer,
  useTheme,
} from 'react-native-gin-boilerplate';
import {
  IcLock,
  IcUser,
  IcWallet,
  IcConsole,
  IcArrowRight,
} from '@app/assets/svg';
import Config from 'react-native-config';

type TMenu =
  | 'UserInformation'
  | 'InterestedArea'
  | 'TwoFactorAuthentication'
  | 'Wallet'
  | 'ChangePassword'
  | 'FAQ'
  | 'Logger';

const MenuList: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<TNavigation>();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);

  const data: {key: TMenu; name: string; icon: JSX.Element}[] = [
    {
      key: 'UserInformation',
      name: i18n.t('UserProfile.DetailedUserInformation'),
      icon: <IcUser color={'black'} />,
    },
    {
      key: 'TwoFactorAuthentication',
      name: i18n.t('UserProfile.TwoFactorAuthentication'),
      icon: <IcConsole />,
    },
    {key: 'Wallet', name: i18n.t('Wallet.title'), icon: <IcWallet />},
    {
      key: 'ChangePassword',
      name: i18n.t('ChangePassword.title'),
      icon: <IcLock />,
    },
    {
      key: 'Logger',
      name: i18n.t('common.NetworkLogger'),
      icon: <IcConsole />,
    },
  ];

  /**
   * User Profile
   * - Vendor has no Interested Area, FAQs
   * - Vendor and Non-RealiFiAgent have no 2FA Authentication, Wallet
   */
  const dataFiltered = (function () {
    let _tmpData = [...data];
    if (user?.source !== 'created-by-admin') {
      _tmpData = _tmpData.filter(e => e.key !== 'ChangePassword');
    }
    if (user?.typeOfUser === 'Vendor') {
      _tmpData = _tmpData.filter(
        e =>
          !['InterestedArea', 'TwoFactorAuthentication', 'FAQ'].includes(e.key),
      );
    }
    if (user?.typeOfUser && ['NonRealiFiAgent'].includes(user?.typeOfUser)) {
      _tmpData = _tmpData.filter(
        e =>
          !['InterestedArea', 'Wallet', 'TwoFactorAuthentication'].includes(
            e.key,
          ),
      );
    }
    if (Config.IOS_APP_NAME !== 'Real Estate MKP') {
      _tmpData = _tmpData.filter(e => e.key !== 'Logger');
    }
    return _tmpData;
  })();

  const $iconWrapper: ViewStyle = {
    ...styles.iconWrapper,
    backgroundColor: '#EAF9FB',
  };

  const $menuName: TextStyle = {
    ...styles.menuName,
    color: colors.menuText,
  };

  const onMenuItemPress = (key: TMenu) => {
    switch (key) {
      case 'UserInformation':
        navigation.navigate('DETAILED_USER_INFOR_SCREEN', {});
        break;
      case 'ChangePassword':
        navigation.navigate('CHANGE_PASSWORD_SCREEN', {});
        break;
      case 'FAQ':
        navigation.navigate('FAQ_SCREEN', {});
        break;
      case 'TwoFactorAuthentication':
        navigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
        break;
      case 'Wallet':
        navigation.navigate('WALLET_SCREEN', {});
        break;
      default:
        break;
    }
  };

  return (
    <FlexView>
      {dataFiltered.map((item, index) => {
        const $separator: ViewStyle = {
          ...styles.separator,
          backgroundColor: colors.separatorBackground,
          display: index === data.length - 1 ? 'none' : 'flex',
        };
        const _onMenuItemPress = () => onMenuItemPress(item.key);
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.8}
            onPress={_onMenuItemPress}>
            <RowContainer style={styles.wrapper}>
              <RowContainer style={styles.wrapperContent}>
                <View style={$iconWrapper}>{item.icon}</View>
                <Text style={$menuName}>{item.name}</Text>
              </RowContainer>
              <IcArrowRight width={18} height={18} />
            </RowContainer>
            <View style={$separator} />
          </TouchableOpacity>
        );
      })}
    </FlexView>
  );
};

export default React.memo(MenuList);

const styles = StyleSheet.create({
  menuName: {
    flex: 1,
    ...TPoppinsStyle.H1624Medium,
  },
  wrapper: {
    alignItems: 'center',
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
    justifyContent: 'space-between',
  },
  wrapperContent: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    height: ratioW(1),
    marginHorizontal: ratioW(16),
  },
  iconWrapper: {
    width: ratioW(40),
    height: ratioW(40),
    alignItems: 'center',
    borderRadius: ratioW(8),
    marginRight: ratioW(12),
    justifyContent: 'center',
  },
});
