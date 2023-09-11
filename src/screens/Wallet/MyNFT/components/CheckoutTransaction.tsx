import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {AutoImage, Button, Separator, Text} from '@app/components/atoms';
import AnimatedFailed from '@app/components/atoms/Animated/AnimatedFailed';
import {Header} from '@app/components/atoms/Header';
import {FlexView, ViewCondition} from '@app/components/organism';
import i18n from '@app/i18n';
import {ICheckoutTransactionScreenProps} from '@app/stacks/types/TNoFooterStack';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {navigate} from '@app/utils/UNavigation';
import {TPoppinsStyle} from '@app/utils/UTextStyle';

const CheckoutTransaction: React.FC<ICheckoutTransactionScreenProps> = ({
  route,
}) => {
  const {nft, screenType, type, isSeller} = route.params;
  const {colors} = useTheme();

  const $title = StyleSheet.flatten([
    styles.title,
    {color: colors.transferTitle},
  ]);
  const $desc = StyleSheet.flatten([styles.desc, {color: colors.searchIcon}]);
  const $itemName = StyleSheet.flatten([
    styles.itemName,
    {
      color:
        screenType === 'success' ? colors.priceTextMkp : colors.cancelColor,
    },
  ]);
  const $itemCenter: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
  };
  const $container: ViewStyle = {
    ...styles.paddingHor16,
    backgroundColor: colors.mainBackground,
    ...$itemCenter,
  };

  const onGoWallet = () => navigate('WALLET_SCREEN', {});
  const onShopping = () => navigate('EXCHANGE_STACK', {});
  const onGoNFTDetail = () => navigate('NFT_DETAIL_SCREEN', {itemId: nft._id});

  const renderSuccessBtnText = () => {
    if (isSeller) {
      return i18n.t('Wallet.GoToExchange');
    } else {
      return i18n.t('Wallet.ContinueShopping');
    }
  };
  const renderImage = () => {
    switch (screenType) {
      case 'failed':
        return <AnimatedFailed />;
      case 'success':
        return <AutoImage uri={nft.images} style={styles.itemImage} />;
      default:
        <React.Fragment />;
    }
  };
  const renderBtn = () => {
    switch (screenType) {
      case 'success':
        return (
          <>
            <Button title={i18n.t('Wallet.MyWallet')} onPress={onGoWallet} />
            <Separator height={ratioW(20)} />
            <Button
              title={renderSuccessBtnText()}
              buttonType={'bordered'}
              onPress={onShopping}
            />
          </>
        );
      case 'failed':
        return (
          <Button
            title={i18n.t('Wallet.BackToNFTDetails')}
            mainColor={colors.walletBackground}
            onPress={onGoNFTDetail}
          />
        );
    }
  };

  const title = () => {
    switch (screenType) {
      case 'success':
        return 'Congratulations!';
      case 'failed':
        if (isSeller) {
          switch (type) {
            case 'fixedPrice':
            case 'auction':
            case 'endAuction':
              return i18n.t('Wallet.YourListedWasFailed');
            case 'offer':
            case 'cancel':
              return i18n.t('Wallet.YourApprovalWasFailed');
          }
        } else {
          switch (type) {
            case 'fixedPrice':
              return i18n.t('Wallet.YourPurchaseWasUnsuccessful');
            case 'auction':
              return i18n.t('Wallet.YourBidWasFailed');
            case 'offer':
              return i18n.t('Wallet.OfferFailed');
          }
        }
    }
  };
  const desc = () => {
    switch (screenType) {
      case 'success':
        if (isSeller) {
          switch (type) {
            case 'fixedPrice':
            case 'auction':
              return i18n.t('Wallet.YouHaveSuccessfullyListedOnExchange');
            case 'endAuction':
              return i18n.t('Wallet.YouHaveSuccessfullyEndedAuctionEarly');
            case 'offer':
              return i18n.t('Wallet.YouHaveSuccessfullyApprovalAnOfferFor');
            case 'cancel':
              return i18n.t('Wallet.YouHaveSuccessfullyCancelFor');
          }
        } else {
          switch (type) {
            case 'fixedPrice':
              return i18n.t('Wallet.YouHaveSuccessfullyPurchased');
            case 'auction':
              return i18n.t('Wallet.YouHaveSuccessfullyBidFor');
            case 'offer':
              return i18n.t('Wallet.YouHaveSuccessfullyOfferFor');
          }
        }
        break;
      case 'failed':
        if (isSeller) {
          switch (type) {
            case 'fixedPrice':
            case 'auction':
              return i18n.t('Wallet.YouHaveFailedToListedOnExchange');
            case 'endAuction':
              return i18n.t('Wallet.YouHaveFailedToEndedTheAuctionEarly');
            case 'offer':
              return i18n.t('Wallet.YouHaveFailedToApproveAnOfferFor');
            case 'cancel':
              return i18n.t('Wallet.YouHaveFailedToCancelFor');
          }
        } else {
          switch (type) {
            case 'fixedPrice':
              return i18n.t('Wallet.YouHaveFailedToPurchase');
            case 'auction':
              return i18n.t('Wallet.YouHaveFailedToBidFor');
            case 'offer':
              return i18n.t('Wallet.UnableToCompleteYourOfferFor');
          }
        }
    }
  };

  return (
    <FlexView>
      <Header isShowBack={false} title={i18n.t('Exchange.title')} />
      <FlexView style={$container}>
        <View style={$itemCenter}>
          {renderImage()}
          <Separator height={ratioW(59)} />
          <Text style={$title}>{title()}</Text>
          <Separator height={ratioW(12)} />
          <Text style={$desc}>{desc()}</Text>
          <Separator height={ratioW(8)} />
          <Text style={$itemName}>
            {'"'}
            {nft.propertyAddress}
            {'"'}
          </Text>
          <ViewCondition isVisible={screenType === 'failed'}>
            <Separator height={ratioW(8)} />
            <Text style={$desc}>{i18n.t('Wallet.PleaseTryAgain')}</Text>
          </ViewCondition>
        </View>
      </FlexView>
      <View style={styles.marginHor16}>
        {renderBtn()}
        <Separator height={ratioW(20)} />
      </View>
    </FlexView>
  );
};

export default CheckoutTransaction;

const styles = StyleSheet.create({
  container: {flex: 1},
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
  marginHor16: {
    marginHorizontal: ratioW(16),
  },
  itemImage: {
    width: ratioW(338),
    height: ratioW(254),
    borderRadius: ratioW(12),
  },
  paddingHor16: {paddingHorizontal: ratioW(16)},
});
