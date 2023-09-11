import React from 'react';
import i18n from '@app/i18n';
import {StyleSheet} from 'react-native';
import {ScrollView} from '@app/components/organism';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AnimatedSuccess} from '@app/components/atoms/Animated';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  Separator,
  closeGlobalModal,
} from 'react-native-gin-boilerplate';
import UNavigation from '@app/utils/UNavigation';
import {HeaderCommon} from '@app/components/atoms/Header';

const SuccessTransaction = () => {
  const $title = StyleSheet.flatten([styles.title, {color: '#15191B'}]);
  const $desc = StyleSheet.flatten([styles.desc, {color: '#414E54'}]);

  const onPress = () => {
    closeGlobalModal();
    UNavigation.navigate('WALLET_SCREEN', {});
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlexView>
        <HeaderCommon title={''} isShowBack={false} />
        <ScrollView contentContainerStyle={styles.$container}>
          <FlexView style={styles.$content}>
            <AnimatedSuccess />
            <Separator height={ratioW(90)} />
            <Text style={$title}>
              {i18n.t('common.Successful')}
              {'!'}
            </Text>
            <Separator height={ratioW(12)} />
            <Text style={$desc}>
              {i18n.t('Wallet.YourTransferHasBeenSent')}
            </Text>
          </FlexView>
          <Button
            title={i18n.t('Wallet.BackToMyWallet')}
            onPress={onPress}
            style={styles.button}
          />
        </ScrollView>
      </FlexView>
    </SafeAreaView>
  );
};

export default SuccessTransaction;

const styles = StyleSheet.create({
  container: {flex: 1},
  $content: {alignItems: 'center', justifyContent: 'center'},
  $container: {
    flexGrow: 1,
  },
  title: {
    ...TPoppinsStyle.H2436Medium,
    textAlign: 'center',
  },
  desc: {
    ...TPoppinsStyle.H1624Regular,
    textAlign: 'center',
  },
  button: {
    marginBottom: ratioW(24),
  },
});
