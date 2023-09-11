import i18n from '@app/i18n';
import styles from '../styles';
import React, {useState} from 'react';
import {
  TSaleType,
  IRPListBid,
  IRPListOffer,
  IRPViewNFTDetail,
} from '@app/definitions/TApi';
import debounce from 'lodash/debounce';
import {useSelector} from 'react-redux';
import mWallet from '@app/utils/methods/mWallet';
import nftManagement from '@app/api/nftManagement';
import useGetBalance from '@app/hooks/useGetBalance';
import {TNFTFilteringKey} from '@app/definitions/TFilter';
import {InteractionManager, ViewStyle} from 'react-native';
import {TReduxState} from '@app/redux/store/configureStore';
import SellType from '@app/screens/Wallet/MyNFT/components/Seller/SellType';
import ConfirmBuyModal from '@app/screens/Wallet/MyNFT/components/ConfirmBuyModal';
import LoadingTransaction from '@app/screens/Wallet/MyNFT/components/LoadingTransaction';
import {
  Button,
  ratioW,
  useTheme,
  Separator,
  TButtonVoid,
  RowContainer,
  screenHeight,
  ViewCondition,
  ButtonWrapper,
  openAlertModal,
  closeAlertModal,
  openBottomSheet,
  openGlobalModal,
  closeGlobalModal,
} from 'react-native-gin-boilerplate';
import UNavigation from '@app/utils/UNavigation';
import Element = React.JSX.Element;
import {IcWarning} from '@app/assets/svg';

export type TTransactionType =
  | 'fixedPrice'
  | 'offer'
  | 'auction'
  | 'endAuction'
  | 'cancel';

interface IProps {
  isSeller: boolean;
  salesType?: TSaleType;
  item: IRPViewNFTDetail;
  userOffer: IRPListOffer[];
  selectedOffer: IRPListOffer | null;
  listBid?: IRPListBid[];
}

const DetailedNFTButton: React.FC<IProps> = ({
  salesType,
  isSeller,
  item,
  userOffer,
  selectedOffer,
  listBid,
}): Element => {
  const {colors} = useTheme();
  const {userBalance} = useGetBalance();
  const [sellType, setSellType] = useState<TNFTFilteringKey>('Auction');
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const currentDate = new Date();
  const endDate = new Date(item.endDate);
  const hideEndAuction = currentDate.getTime() > endDate.getTime();

  const $modal: ViewStyle = {
    backgroundColor: colors.mainBackground,
    maxHeight: screenHeight * 0.6,
    flex: 1,
  };
  const $icon: ViewStyle = {
    alignSelf: 'center',
  };
  const $processModal: ViewStyle = {alignItems: 'stretch', flex: 1};

  const onOpenLoading = (type: TTransactionType) => {
    openGlobalModal({
      containerStyle: $processModal,
      content: (
        <LoadingTransaction
          animateType={'loading'}
          isSeller={isSeller ?? false}
          nftName={item.propertyAddress}
          screenType={type}
        />
      ),
    });
  };
  const onSuccess = (type: TTransactionType) => {
    openGlobalModal({
      containerStyle: $processModal,
      content: (
        <LoadingTransaction
          animateType={'success'}
          isSeller={isSeller ?? false}
          nftName={item.propertyAddress}
          screenType={type}
        />
      ),
    });
    UNavigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
      isSeller: isSeller ?? false,
      nft: item,
      screenType: 'success',
      type: type,
    });
    debounce(() => {
      closeGlobalModal();
    }, 1000)();
  };
  const onFailed = (type: TTransactionType) => {
    closeGlobalModal();
    UNavigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
      isSeller: isSeller ?? false,
      nft: item,
      screenType: 'failed',
      type,
    });
  };
  const onOpenCheckoutModal = (
    title: string,
    btnTitle: string,
    onPress: TButtonVoid,
    isShowTotalRoyalty: boolean,
    totalPrice?: string,
  ) => {
    openBottomSheet({
      element: (
        <ConfirmBuyModal
          modalTitle={title}
          isShowTotalRoyalty={isShowTotalRoyalty}
          buttonTitle={btnTitle}
          buttonPress={onPress}
          itemName={item.propertyAddress}
          total={totalPrice ? totalPrice : String(item.price)}
        />
      ),
      containerStyles: $modal,
    });
  };
  const onOpenSellModal = () => {
    openBottomSheet({
      element: (
        <SellType
          value={sellType}
          onChangeValue={setSellType}
          nft={item}
          isSeller={isSeller}
        />
      ),
      containerStyles: $modal,
    });
  };
  const onBuyBuyer = () => {
    const onConfigSell = () => {
      onOpenLoading('fixedPrice');
      nftManagement
        .buyNFTFixedPrice(item.sellingConfigId)
        .then(() => onSuccess('fixedPrice'))
        .catch(() => onFailed('fixedPrice'));
    };
    const onSubmitBuy = () => {
      mWallet.checkEnoughBalance(userBalance ?? 0, item.price, () => {
        if (user?.isVerifyPhone) {
          UNavigation.navigate('ENTER_OTP_SCREEN', {
            onButtonPress: onConfigSell,
          });
        } else {
          UNavigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
        }
      });
    };
    onOpenCheckoutModal(
      i18n.t('Wallet.CheckOut'),
      i18n.t('Wallet.ConfirmYourCheckOut'),
      onSubmitBuy,
      true,
    );
  };
  const onCancel = () => {
    const onSubmit = () => {
      onOpenLoading('cancel');
      nftManagement
        .cancelConfig(item.sellingConfigId)
        .then(() => onSuccess('cancel'))
        .catch(() => onFailed('cancel'));
    };
    const onOpenModal = () => {
      InteractionManager.runAfterInteractions(() => {
        closeAlertModal();
      }).then(() => {
        onOpenCheckoutModal(
          i18n.t('Wallet.CancelNFTOnExchange'),
          i18n.t('common.Confirm'),
          onSubmit,
          false,
        );
      });
    };
    openAlertModal({
      title: i18n.t('common.Alert'),
      desc: i18n.t('Wallet.AreYouSureYouWantToCancelThisNFT'),
      icon: <IcWarning style={$icon} />,
      rightButtonTitle: i18n.t('common.Yes'),
      leftButtonTitle: i18n.t('common.No'),
      leftButtonType: 'bordered',
      rightButtonType: 'success',
      leftButtonProps: {
        mainColor: colors.dangerColor,
      },
      rightButtonProps: {
        mainColor: colors.dangerColor,
      },
      buttons: {
        onLeftAction: closeAlertModal,
        onRightAction: onOpenModal,
      },
    });
  };
  const onMakeOffer = () => {
    UNavigation.navigate('ENTER_AMOUNT_SCREEN', {
      type: 'offer',
      nft: item,
      isSeller: isSeller,
    });
  };
  const onCancelOffer = () => {
    const cancelOffer = () => {
      onOpenLoading('offer');
      nftManagement
        .cancelOffer(userOffer[0].offer._id)
        .then(() => onSuccess('offer'))
        .catch(() => onFailed('offer'));
    };
    const onSubmit = () => {
      if (user?.isVerifyPhone) {
        UNavigation.navigate('ENTER_OTP_SCREEN', {onButtonPress: cancelOffer});
      } else {
        UNavigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
      }
    };
    onOpenCheckoutModal(
      i18n.t('Wallet.CancelOffer'),
      i18n.t('Wallet.CancelOffer'),
      onSubmit,
      true,
    );
  };
  const onAcceptOffer = () => {
    const onSubmit = () => {
      if (selectedOffer) {
        onOpenLoading('offer');
        nftManagement
          .approveOffer(selectedOffer?.offer._id)
          .then(() => onSuccess('offer'))
          .catch(() => onFailed('offer'));
      }
    };
    onOpenCheckoutModal(
      i18n.t('Wallet.AcceptOffer'),
      i18n.t('Wallet.AcceptOffer'),
      onSubmit,
      true,
      String(selectedOffer?.offer.price),
    );
  };
  const onAuction = () => {
    UNavigation.navigate('ENTER_AMOUNT_SCREEN', {type: 'bid', nft: item});
  };
  const onEndAuction = () => {
    const onSubmit = () => {
      onOpenLoading('endAuction');
      nftManagement
        .endAuction(item.sellingConfigId)
        .then(() => onSuccess('endAuction'))
        .catch(() => onFailed('endAuction'));
    };
    onOpenCheckoutModal(
      i18n.t('Wallet.EndAuction'),
      i18n.t('Wallet.EndAuction'),
      onSubmit,
      !!listBid && listBid?.length > 0,
    );
  };

  const generateBuyerBtn = (): Element => {
    switch (salesType) {
      case 'sellFixedPrice':
        return (
          <ButtonWrapper style={styles.btnWrapper}>
            <Button
              title={i18n.t('common.Buy')}
              onPress={onBuyBuyer}
              style={styles.bidRightButton}
            />
          </ButtonWrapper>
        );
      case 'offer':
        return (
          <ButtonWrapper style={styles.btnWrapper}>
            {userOffer.length > 0 ? (
              <Button
                title={i18n.t('Wallet.CancelOffer')}
                onPress={onCancelOffer}
                style={styles.bidRightButton}
                buttonType="danger"
              />
            ) : (
              <Button
                title={i18n.t('Wallet.MakeAnOffer')}
                onPress={onMakeOffer}
                style={styles.bidRightButton}
              />
            )}
          </ButtonWrapper>
        );
      case 'bid':
        return (
          <ViewCondition isVisible={!hideEndAuction}>
            <ButtonWrapper style={styles.btnWrapper}>
              <Button
                onPress={onAuction}
                title={i18n.t('Wallet.EnterBidOrBuyNow')}
                style={styles.bidRightButton}
              />
            </ButtonWrapper>
          </ViewCondition>
        );
      default:
        return <React.Fragment />;
    }
  };
  const generateSellerBtn = (): Element => {
    switch (salesType) {
      case 'sellFixedPrice':
        return (
          <ButtonWrapper style={styles.btnWrapper}>
            <Button
              title={i18n.t('common.Cancel')}
              onPress={onCancel}
              buttonType="danger"
              style={styles.bidRightButton}
            />
          </ButtonWrapper>
        );
      case 'offer':
        return (
          <ButtonWrapper style={styles.btnWrapper}>
            <RowContainer>
              <Button
                title={i18n.t('common.Cancel')}
                onPress={onCancel}
                buttonType="danger"
                style={styles.bidRightButton}
              />
              {selectedOffer && (
                <>
                  <Separator width={ratioW(20)} />
                  <Button
                    title={i18n.t('Wallet.AcceptOffer')}
                    onPress={onAcceptOffer}
                    style={styles.bidRightButton}
                  />
                </>
              )}
            </RowContainer>
          </ButtonWrapper>
        );
      case 'bid':
        return (
          <ViewCondition isVisible={!hideEndAuction}>
            <ButtonWrapper style={styles.btnWrapper}>
              <RowContainer>
                {!!listBid && listBid.length < 1 && (
                  <>
                    <Button
                      title={i18n.t('common.Cancel')}
                      style={styles.bidRightButton}
                      onPress={onCancel}
                      buttonType="danger"
                    />
                    <Separator width={ratioW(20)} />
                  </>
                )}
                <Button
                  onPress={onEndAuction}
                  title={i18n.t('Wallet.EndAuction')}
                  style={styles.bidRightButton}
                />
              </RowContainer>
            </ButtonWrapper>
          </ViewCondition>
        );
      default:
        return (
          <ButtonWrapper style={styles.btnWrapper}>
            <Button
              title={i18n.t('common.Sell')}
              onPress={onOpenSellModal}
              style={styles.bidRightButton}
            />
          </ButtonWrapper>
        );
    }
  };

  return <>{isSeller ? generateSellerBtn() : generateBuyerBtn()}</>;
};

export default React.memo(DetailedNFTButton);
