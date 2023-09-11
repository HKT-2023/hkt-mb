import IcBook from '@app/assets/svg/Bottom/IcBook';
import IcUsers from '@app/assets/svg/Bottom/IcUsers';
import IcWallet from '@app/assets/svg/Bottom/IcWallet';
import IcBell from '@app/assets/svg/IcBell';
import IcCaretRight from '@app/assets/svg/IcCaretRight';
import {RowContainer} from '@app/components/organism';
import sharedStyles from '@app/styles/sharedStyles';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const data = [
  {title: 'Account', key: 'account', icon: <IcBell color={'#aaaaaa'} />},
  {
    title: 'Notifications',
    key: 'notifications',
    icon: <IcBell color={'#aaaaaa'} />,
  },
  {title: 'Wallet', key: 'wallet', icon: <IcWallet color={'#aaaaaa'} />},
  {
    title: 'Invite friends',
    key: 'invite_friend',
    icon: <IcUsers color={'#aaaaaa'} />,
  },
  {title: 'FAQs', key: 'faqs', icon: <IcBook color={'#aaaaaa'} />},
  {title: 'Help', key: 'help', icon: <IcBell color={'#aaaaaa'} />},
];

const Settings = () => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.itemBackground}]}>
      <View style={styles.header}>
        <Text style={styles.settingsTitle}>Settings</Text>
      </View>
      {data.map(item => (
        <View
          key={item.key}
          style={[styles.itemContainer, {borderTopColor: colors.borderColor}]}>
          <RowContainer style={styles.mainContent}>
            <View
              style={[
                styles.iconLeft,
                {backgroundColor: colors.settingIconBackground},
              ]}>
              {item.icon}
            </View>
            <Text style={styles.title}>{item.title}</Text>
          </RowContainer>
          <IcCaretRight />
        </View>
      ))}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContent: {
    alignItems: 'center',
  },
  header: {
    height: ratioW(42),
    paddingHorizontal: ratioW(12),
    justifyContent: 'center',
  },
  settingsTitle: {
    ...TPoppinsStyle.H1624Regular,
  },
  title: {
    ...TPoppinsStyle.H1216Regular,
  },
  iconLeft: {
    width: ratioW(35),
    height: ratioW(35),
    alignItems: 'center',
    borderRadius: ratioW(8),
    justifyContent: 'center',
    marginRight: ratioW(20),
  },
  container: {
    borderRadius: ratioW(16),
    ...sharedStyles.shadow,
  },
  itemContainer: {
    borderTopWidth: 1,
    paddingVertical: ratioW(8),
    paddingHorizontal: ratioW(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
