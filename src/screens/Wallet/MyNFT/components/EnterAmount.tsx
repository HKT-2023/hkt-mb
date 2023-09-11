import React, {useCallback, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  AutoImage,
  Button,
  ButtonWrapper,
  Separator,
  Text,
} from '@app/components/atoms';
import {Header} from '@app/components/atoms/Header';
import {FlexView, RowContainer, ViewCondition} from '@app/components/organism';
import i18n from '@app/i18n';
import {IEnterAmountScreenProps} from '@app/stacks/types/TNoFooterStack';
import {useTheme} from '@app/theme';
import {fontSizeText, ratioW, screenHeight} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import nftManagement from '@app/api/nftManagement';
import mNumber from '@app/utils/methods/mNumber';
import {
  closeGlobalModal,
  openBottomSheet,
  openGlobalModal,
} from '@app/components/molecules/Modal/function';
import ConfirmBuyModal from './ConfirmBuyModal';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';
import LoadingTransaction from './LoadingTransaction';
import debounce from 'lodash/debounce';
import {REALTokenImg} from '@app/assets/photos';
import useGetList from '@app/hooks/useGetList';
import {IRPListBid, IRQListOffer} from '@app/definitions/TApi';
import mWallet from '@app/utils/methods/mWallet';
import useGetBalance from '@app/hooks/useGetBalance';
import {useFocusEffect} from '@react-navigation/native';

export type TScreenType = 'fixedPrice' | 'offer' | 'auction' | 'endAuction';

const EnterAmount: React.FC<IEnterAmountScreenProps> = ({
  route,
  navigation,
}) => {
  const {nft, type, isSeller} = route.params;
  const {colors} = useTheme();
  const {userBalance} = useGetBalance();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const [price, setPrice] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const {data} = useGetList<IRQListOffer, IRPListBid>(nftManagement.listBid, {
    limit: 1,
    NFTId: nft?._id ?? '',
  });
  const checkInput =
    !!price &&
    nft?.salesType &&
    nft?.salesType?.key === 'bid' &&
    (data.length > 0
      ? Number(mNumber.removeComma(price)) <= data?.[0]?.bid?.price
      : Number(mNumber.removeComma(price)) <= nft?.price);
  const inputErrorText = () => {
    if (price) {
      if (data.length > 0) {
        return i18n.t('Wallet.YourBidMustBeAtLeastTheMinimumBidPrice');
      } else {
        return i18n.t('Wallet.YourPriceMustHigherThanStartPrice');
      }
    } else {
      return '';
    }
  };
  const onDisableBtn = () => {
    if (nft?.salesType && nft?.salesType.key === 'bid') {
      return !price || checkInput;
    } else {
      return !price;
    }
  };
  const color = onDisableBtn() ? colors.cancelColor : colors.activeColor;
  const isShowWinPrice =
    (nft?.salesType?.key === 'bid' || nft?.salesType?.key === 'offer') &&
    !price &&
    !!nft?.winningPrice;
  const getBorderColor = () => {
    if (checkInput) {
      return colors.dangerColor;
    } else {
      if (isFocused) {
        return colors.inputActiveBorder;
      } else {
        return colors.inputInactiveBorder;
      }
    }
  };

  const $title = StyleSheet.flatten([styles.title, {color: colors.searchIcon}]);
  const $price = StyleSheet.flatten([
    styles.price,
    {color: colors.transferTitle},
  ]);
  const $textInputText = StyleSheet.flatten([styles.price, {color: color}]);
  const $container: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };
  const $modal: ViewStyle = {
    backgroundColor: colors.mainBackground,
    maxHeight: screenHeight * 0.6,
    flex: 1,
  };
  const $errorText: TextStyle = {
    letterSpacing: 0.4,
    color: colors.dangerColor,
    ...TPoppinsStyle.H1216Regular,
    display: checkInput ? 'flex' : 'none',
  };
  const selectionColor = checkInput
    ? colors.dangerColor
    : colors.inputActiveBorder;
  const $containerStyles: ViewStyle = {
    width: '100%',
    padding: ratioW(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ratioW(4),
    borderColor: getBorderColor(),
    borderWidth: isFocused ? 2 : 1.5,
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }, []),
  );

  const onOpenLoading = (screenType: TScreenType) => {
    openGlobalModal({
      containerStyle: styles.processModal,
      content: (
        <LoadingTransaction
          animateType={'loading'}
          isSeller={isSeller ?? false}
          nftName={nft.propertyAddress}
          screenType={screenType}
        />
      ),
    });
  };
  const onSuccess = (typeScreen: TScreenType) => {
    openGlobalModal({
      containerStyle: styles.processModal,
      content: (
        <LoadingTransaction
          animateType={'success'}
          isSeller={isSeller ?? false}
          nftName={nft.propertyAddress}
          screenType={typeScreen}
        />
      ),
    });
    navigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
      isSeller: isSeller ?? false,
      nft,
      screenType: 'success',
      type: typeScreen,
    });
    debounce(() => {
      closeGlobalModal();
    }, 1000)();
  };
  const onFailed = (failedTypeScreen: TScreenType) => {
    closeGlobalModal();
    navigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
      isSeller: isSeller ?? false,
      nft,
      screenType: 'failed',
      type: failedTypeScreen,
    });
  };
  const onOfferSeller = () => {
    onOpenLoading('offer');
    nftManagement
      .configOffer({
        nftId: nft._id,
        price: Number(mNumber.removeComma(price)),
      })
      .then(() => onSuccess('offer'))
      .catch(() => onFailed('offer'));
  };
  const onOfferBuyer = () => {
    const onConfirm = () => {
      onOpenLoading('offer');
      nftManagement
        .makeOffer({
          sellingConfigId: nft.sellingConfigId,
          price: Number(mNumber.removeComma(price)),
        })
        .then(() => onSuccess('offer'))
        .catch(() => onFailed('offer'));
    };
    mWallet.checkEnoughBalance(
      userBalance ?? 0,
      Number(mNumber.removeComma(price)),
      () => {
        if (user?.isVerifyPhone) {
          navigation.navigate('ENTER_OTP_SCREEN', {onButtonPress: onConfirm});
        } else {
          navigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
        }
      },
    );
  };
  const onBidBuyer = () => {
    mWallet.checkEnoughBalance(
      userBalance ?? 0,
      Number(mNumber.removeComma(price)),
      () => {
        onOpenLoading('auction');
        nftManagement
          .makeBid({
            price: Number(mNumber.removeComma(price)),
            sellingConfigId: nft.sellingConfigId,
          })
          .then(() => onSuccess('auction'))
          .catch(() => onFailed('auction'));
      },
    );
  };
  const onSellSeller = () => {
    onOpenLoading('fixedPrice');
    nftManagement
      .configSell({
        nftId: nft._id,
        price: Number(mNumber.removeComma(String(price))),
      })
      .then(() => onSuccess('fixedPrice'))
      .catch(() => onFailed('fixedPrice'));
  };
  const onSubmit = () => {
    switch (type) {
      case 'fixedPrice':
        onSellSeller();
        break;
      case 'bid':
        mWallet.checkEnoughBalance(
          userBalance ?? 0,
          Number(mNumber.removeComma(price)),
          () => {
            if (user?.isVerifyPhone) {
              navigation.navigate('ENTER_OTP_SCREEN', {
                onButtonPress: onBidBuyer,
              });
            } else {
              navigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
            }
          },
        );
        break;
      case 'offer':
        if (isSeller) {
          onOfferSeller();
        } else {
          onOfferBuyer();
        }
        break;
    }
  };
  const modalProps = () => {
    switch (type) {
      case 'fixedPrice':
        return {
          modalTitle: i18n.t('Wallet.ListedOnExchange'),
          isShowTotalRoyalty: false,
          buttonTitle: i18n.t('Wallet.ConfirmListedOnExchange'),
        };
      case 'bid':
        return {
          modalTitle: i18n.t('Wallet.ConfirmYourAuction'),
          isShowTotalRoyalty: true,
          buttonTitle: i18n.t('Wallet.ConfirmYourAuction'),
        };
      case 'offer':
        return {
          modalTitle: i18n.t('Wallet.MakeAnOffer'),
          isShowTotalRoyalty: false,
          buttonTitle: i18n.t('Wallet.MakeAnOffer'),
        };
    }
  };
  const onOpenModal = () => {
    openBottomSheet({
      element: (
        <ConfirmBuyModal
          {...modalProps()}
          buttonPress={onSubmit}
          itemName={nft.propertyAddress}
          total={price}
        />
      ),
      containerStyles: $modal,
    });
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  const onchange = (am: string) => {
    const amc = mNumber.formatBidValue(am, true, true);
    setPrice(amc);
  };

  const renderTitle = () => {
    switch (type) {
      case 'fixedPrice':
        return i18n.t('Wallet.FixedPrice');
      case 'bid':
        return i18n.t('Wallet.Auction');
      case 'offer':
        return i18n.t('Wallet.Offer');
      default:
        return '';
    }
  };
  const renderMainText = () => {
    switch (type) {
      case 'bid':
        return i18n.t('Wallet.YourPrice');
      case 'fixedPrice':
      case 'offer':
        return i18n.t('common.Token');
      default:
        return '';
    }
  };

  return (
    <FlexView style={$container}>
      <Header title={renderTitle()} />
      <Separator height={ratioW(60)} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlexView style={styles.inputContainer}>
          <Text style={$title}>{renderMainText()}</Text>
          <View style={styles.containerTextInput}>
            <View style={[$containerStyles, styles.contentTextInput]}>
              <TextInput
                ref={inputRef}
                maxLength={11}
                keyboardType="number-pad"
                value={price}
                onChangeText={onchange}
                style={$textInputText}
                selectionColor={selectionColor}
                placeholderTextColor={color}
                allowFontScaling={false}
                blurOnSubmit
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <Text style={$price}>{i18n.t('common.REAL')}</Text>
            </View>
            <Text style={$errorText}>{inputErrorText()}</Text>
          </View>
          <ViewCondition isVisible={isShowWinPrice}>
            <Separator height={ratioW(72)} />
            <RowContainer style={styles.itemCenter}>
              <Text style={styles.youCanBuyText}>
                {i18n.t('Wallet.YouCanBuyThisNFTDirectlyWith')}{' '}
              </Text>
              <AutoImage source={REALTokenImg} style={styles.icon} />
              <Text style={styles.youCanBuyText}>{nft.winningPrice}</Text>
            </RowContainer>
          </ViewCondition>
        </FlexView>
        <ButtonWrapper>
          <Button
            title={i18n.t('common.Submit')}
            onPress={onOpenModal}
            disabled={onDisableBtn()}
          />
        </ButtonWrapper>
      </ScrollView>
    </FlexView>
  );
};

export default EnterAmount;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
  },
  price: {
    ...TPoppinsStyle.H4552Medium,
    lineHeight: Platform.OS === 'ios' ? 0 : 52,
    marginRight: ratioW(8),
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentTextInput: {borderWidth: 0, padding: 0},
  containerTextInput: {
    marginHorizontal: ratioW(60),
    alignItems: 'center',
    marginTop: ratioW(8),
  },
  itemCenter: {alignItems: 'center'},
  processModal: {alignItems: 'stretch', flex: 1},
  youCanBuyText: {
    ...TPoppinsStyle.H1420Medium,
  },
  icon: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  input: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    fontSize: fontSizeText(16),
  },
});
