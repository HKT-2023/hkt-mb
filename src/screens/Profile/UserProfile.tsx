import React from 'react';
import i18n from '@app/i18n';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  ScrollView,
  InteractionManager,
} from 'react-native';
import debounce from 'lodash/debounce';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import MenuList from './components/MenuList';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {getAuthHash} from '@app/api/userManagement';
import {getVersion} from 'react-native-device-info';
import {TReduxState} from '@app/redux/store/configureStore';
import {IUserProfileScreenProps} from '@app/stacks/types/TUserStack';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  useTheme,
  StatusBar,
  AutoImage,
  RowContainer,
  openAlertModal,
  closeAlertModal,
} from 'react-native-gin-boilerplate';
import {IcWarning} from '@app/assets/svg';
import {HeaderCommon} from '@app/components/atoms/Header';

const UserProfile: React.FC<IUserProfileScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const userId = user?._id;

  const $phone: StyleProp<TextStyle> = {
    ...styles.phone,
    color: '#16616A',
  };

  const $email: StyleProp<TextStyle> = {
    ...styles.email,
    color: '#16616A',
  };

  const $icon: StyleProp<ViewStyle> = {
    alignSelf: 'center',
  };

  const $button: StyleProp<ViewStyle> = {
    width: undefined,
    marginBottom: ratioW(16),
    paddingVertical: ratioW(12),
    marginHorizontal: ratioW(16),
    backgroundColor: colors.mainBackground,
  };

  const onAgreeLogout = () => {
    InteractionManager.runAfterInteractions(() => {
      if (userId) {
        getAuthHash({userId: userId}).then(res => {
          if (res.data?.hex) {
            // OneSignal.setOneSignalExternalId('', res.data?.hex);
          }
        });
      }
    }).then(() => {
      Dispatch.logout();
      debounce(() => navigation.navigate('LOGIN_SCREEN', {}), 300)();
    });
  };

  const onLogout = () => {
    openAlertModal({
      icon: <IcWarning style={$icon} />,
      title: i18n.t('common.LogOut'),
      desc: i18n.t('UserProfile.AreUSureUWantToLogOut'),
      leftButtonTitle: i18n.t('common.Cancel'),
      rightButtonTitle: i18n.t('common.Confirm'),
      buttons: {
        onLeftAction: closeAlertModal,
        onRightAction: onAgreeLogout,
      },
      leftButtonType: 'bordered',
      rightButtonType: 'success',
      leftButtonProps: {
        mainColor: colors.dangerColor,
      },
      rightButtonProps: {
        mainColor: colors.dangerColor,
      },
      statusbarColor: 'transparent',
    });
  };

  const getName = () => {
    if (user?.typeOfUser === 'Vendor') {
      return user?.businessName ?? 'Unknown Name';
    } else {
      return `${user?.firstName ?? 'Unknown'} ${user?.lastName ?? 'Name'}`;
    }
  };
  const appVersion = getVersion();

  return (
    <FlexView>
      <StatusBar barStyle="light-content" />
      <HeaderCommon title={i18n.t('UserProfile.title')} isShowBack={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <RowContainer
          style={[styles.mainInfo, {backgroundColor: colors.mainBackground}]}>
          <AutoImage uri={user?.avatarUrl} style={styles.avatar} />
          <FlexView>
            <Text style={styles.name}>{getName()}</Text>
            <Text style={$email}>{user?.email}</Text>
            <Text style={$phone}>{user?.phone}</Text>
          </FlexView>
        </RowContainer>
        <FlexView style={{backgroundColor: colors.mainBackground}}>
          <MenuList />
          <Button
            style={$button}
            onPress={onLogout}
            buttonType="bordered"
            mainColor={colors.dangerColor}
            title={i18n.t('common.LogOut')}
          />
          <Text style={styles.versionText}>v.{appVersion}</Text>
        </FlexView>
      </ScrollView>
    </FlexView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  name: {
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1624Bold,
  },
  email: {
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1420Medium,
  },
  phone: {
    ...TPoppinsStyle.H1420Medium,
  },
  mainInfo: {
    marginVertical: ratioW(8),
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
  },
  avatar: {
    width: ratioW(64),
    height: ratioW(64),
    marginRight: ratioW(16),
    borderRadius: ratioW(32),
  },
  versionText: {
    ...TPoppinsStyle.H1420Medium,
    alignSelf: 'center',
    marginBottom: ratioW(36),
  },
});
