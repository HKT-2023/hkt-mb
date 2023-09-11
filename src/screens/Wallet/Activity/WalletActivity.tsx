import {StyleSheet, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import i18n from '@app/i18n';
import TabViewComponent, {
  SceneProps,
} from '@app/components/molecules/TabView/TabViewComponent';
import ActivityTab from './components/ActivityTab';
import {HeaderCommon} from '@app/components/atoms/Header';
import {IWalletActivityRoute} from '@app/definitions/TWallet';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {IWalletActivityScreenProps} from '@app/stacks/types/TNoFooterStack';
import {FlexView, ratioW, useTheme} from 'react-native-gin-boilerplate';

const ActivityRoute: IWalletActivityRoute[] = [
  {
    key: 'LISTED_ON_EXCHANGE',
    title: i18n.t('Wallet.ListedOnExchange'),
  },
  {
    key: 'TRANSFERRED',
    title: i18n.t('Wallet.Transferred'),
  },
  {
    key: 'RECEIVED',
    title: i18n.t('Wallet.Received'),
  },
  {
    key: 'FIXED_PRICE',
    title: i18n.t('Wallet.FixedPrice'),
  },
  {
    key: 'BID',
    title: i18n.t('Wallet.Bids'),
  },
  {
    key: 'OFFER',
    title: i18n.t('Wallet.Offers'),
  },
  {
    key: 'APPROVED',
    title: i18n.t('Wallet.Approved'),
  },
  {
    key: 'CANCEL',
    title: i18n.t('Wallet.Canceled'),
  },
];

const WalletActivity: React.FC<IWalletActivityScreenProps> = () => {
  const {colors} = useTheme();
  const [index, setIndex] = useState<number>(0);

  useChangeStatusBar('light-content');

  const renderScene = ({route: tabRoute}: SceneProps): JSX.Element => {
    switch (tabRoute.key) {
      case 'LISTED_ON_EXCHANGE':
        return (
          <ActivityTab type="SaleAtFixedPrice,SaleNFTWithAuction,SaleNFTWithOffer" />
        );
      case 'TRANSFERRED':
        return <ActivityTab type="TransferNFT,TransferToken" />;
      case 'RECEIVED':
        return (
          <ActivityTab type="ReceiveNFT,ReceiveToken,ReceiveTokenFromLearning,ReceiveTokenFromLearning,ReceiveTokenFromEstimation,ReceiveTokenByLossBid" />
        );
      case 'FIXED_PRICE':
        return (
          <ActivityTab type="PurchasedNFT,ReceiveTokenFromSaleAtFixedPrice" />
        );
      case 'BID':
        return (
          <ActivityTab type="SendAuction,EarlyFinishAuction,ReceiveTokenFromAuction,ReceiveNFTFromAuction" />
        );
      case 'OFFER':
        return (
          <ActivityTab type="SendOffer,ApproveOffer,ReceiveNFTFromOffer" />
        );
      case 'APPROVED':
        return <ActivityTab type="ApproveNFT,ApproveToken" />;
      case 'CANCEL':
        return (
          <ActivityTab type="CancelSaleAtFixedPrice,CancelSaleWithOffer,CancelSaleAuction" />
        );
      default:
        return <React.Fragment />;
    }
  };

  const $tabBar: ViewStyle = {
    backgroundColor: colors.mainBackground,
    marginHorizontal: ratioW(16),
  };

  const $flexView: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };

  const $header: ViewStyle = {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  };

  return (
    <FlexView style={$flexView}>
      <HeaderCommon
        containerStyle={$header}
        title={i18n.t('common.Activity')}
      />
      <TabViewComponent
        index={index}
        scrollEnable={true}
        tabStyle={styles.tab}
        styleTabBar={$tabBar}
        routes={ActivityRoute}
        onChangeIndex={setIndex}
        renderScene={renderScene}
        sceneStyle={styles.sceneStyle}
        styleIndicator={styles.indicator}
      />
    </FlexView>
  );
};

export default WalletActivity;

const styles = StyleSheet.create({
  sceneStyle: {
    marginVertical: 0,
  },
  tab: {
    width: 'auto',
    paddingHorizontal: ratioW(8),
    marginHorizontal: ratioW(12),
  },
  indicator: {
    height: ratioW(3),
    borderTopLeftRadius: ratioW(100),
    borderTopRightRadius: ratioW(100),
  },
});
