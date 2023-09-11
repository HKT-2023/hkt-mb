import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AnimatedSpin, AnimatedSuccess} from '@app/components/atoms/Animated';
import {Header} from '@app/components/atoms/Header';
import {FlexView, ScrollView, ViewCondition} from '@app/components/organism';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {Separator, Text} from '@app/components/atoms';
import i18n from '@app/i18n';
import {TTransactionType} from '@app/HOC/components/DetailedNFTButton';

interface ILoadingTransaction {
  screenType: TTransactionType;
  animateType: 'loading' | 'success';
  isSeller: boolean;
  nftName: string;
}

const LoadingTransaction = (props: ILoadingTransaction) => {
  const {colors} = useTheme();

  const title = () => {
    switch (props.animateType) {
      case 'loading':
        if (props.isSeller) {
          switch (props.screenType) {
            case 'fixedPrice':
            case 'auction':
            case 'endAuction':
              return i18n.t('Wallet.YourNFTIsProcessing');
            case 'offer':
              return i18n.t('Wallet.YourApprovalIsProcessing');
            case 'cancel':
              return i18n.t('Wallet.YourCancelIsProcessing');
          }
        } else {
          switch (props.screenType) {
            case 'fixedPrice':
              return i18n.t('Wallet.YourPurchaseIsProcessing');
            case 'auction':
              return i18n.t('Wallet.YourBidIsProcessing');
            case 'offer':
              return i18n.t('Wallet.YourOfferIsProcessing');
          }
        }
        break;
      case 'success':
        if (props.isSeller) {
          switch (props.screenType) {
            case 'fixedPrice':
            case 'auction':
              return i18n.t('Wallet.YourNFTWasListedOnExchangeSuccessful');
            case 'endAuction':
              return i18n.t('Wallet.YouHaveEndedTheAuctionEarlySuccessful');
            case 'offer':
              return i18n.t('Wallet.YourApprovalWasSuccessful');
            case 'cancel':
              return i18n.t('Wallet.YourCancelWasSuccessful');
          }
        } else {
          switch (props.screenType) {
            case 'fixedPrice':
              return i18n.t('Wallet.YourPurchaseWasSuccessful');
            case 'auction':
              return i18n.t('Wallet.YourBidWasSuccessful');
            case 'offer':
              return i18n.t('Wallet.YourOfferWasSuccessful');
          }
        }
    }
  };
  const desc = () => {
    switch (props.animateType) {
      case 'loading':
        if (props.isSeller) {
          switch (props.screenType) {
            case 'fixedPrice':
            case 'auction':
              return (
                i18n.t('Wallet.YouJustListed') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
            case 'endAuction':
              return (
                i18n.t('Wallet.YouJustEndedThe') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AuctionEarlyItShouldBeConfirmedShortly') +
                '.'
              );
            case 'offer':
              return (
                i18n.t('Wallet.YouJustApprovedForAnOfferFor') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
            case 'cancel':
              return (
                i18n.t('Wallet.YouJustCancelFor') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
          }
        } else {
          switch (props.screenType) {
            case 'fixedPrice':
              return (
                i18n.t('Wallet.YouJustPurchased') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
            case 'auction':
              return (
                i18n.t('Wallet.YouJustBidFor') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
            case 'offer':
              return (
                i18n.t('Wallet.YouJustOfferFor') +
                ' ' +
                props.nftName +
                ' ' +
                i18n.t('Wallet.AndItShouldBeConfirmedShortly') +
                '.'
              );
          }
        }
        break;
      case 'success':
        if (props.isSeller) {
          switch (props.screenType) {
            case 'fixedPrice':
            case 'auction':
              return i18n.t('Wallet.YouHaveListedOnExchangeSuccessful');
            case 'endAuction':
              return i18n.t('Wallet.YouHaveEndedTheAuctionEarlySuccessful');
            case 'offer':
              return i18n.t('Wallet.YouHaveOfferedFor');
            case 'cancel':
              return i18n.t('Wallet.YouHaveCanceledFor');
          }
        } else {
          switch (props.screenType) {
            case 'fixedPrice':
              return i18n.t('Wallet.YouHavePurchased');
            case 'auction':
              return i18n.t('Wallet.YouHaveBidFor');
            case 'offer':
              return i18n.t('Wallet.YouHaveOfferedFor');
          }
        }
    }
  };

  const $title = StyleSheet.flatten([
    styles.title,
    {color: colors.transferTitle},
  ]);
  const $desc = StyleSheet.flatten([styles.desc, {color: colors.searchIcon}]);
  const $itemName = StyleSheet.flatten([
    styles.itemName,
    {color: colors.priceTextMkp},
  ]);

  const renderImage = () => {
    switch (props.animateType) {
      case 'loading':
        return <AnimatedSpin showProcessText={false} />;
      case 'success':
        return <AnimatedSuccess />;
      default:
        return <React.Fragment />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlexView>
        <Header title={''} isShowBack={false} />
        <ScrollView contentContainerStyle={styles.$container}>
          <FlexView style={styles.$content}>
            {renderImage()}
            <Separator height={ratioW(90)} />
            <Text style={$title}>{title()}</Text>
            <Separator height={ratioW(12)} />
            <Text style={$desc}>{desc()}</Text>
            <ViewCondition isVisible={props.animateType === 'success'}>
              <Separator height={ratioW(8)} />
              <Text style={$itemName}>
                {'"'}
                {props.nftName}
                {'"'}
              </Text>
            </ViewCondition>
          </FlexView>
        </ScrollView>
      </FlexView>
    </SafeAreaView>
  );
};

export default LoadingTransaction;

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
  itemName: {
    ...TPoppinsStyle.H2228Medium,
    textAlign: 'center',
  },
});
