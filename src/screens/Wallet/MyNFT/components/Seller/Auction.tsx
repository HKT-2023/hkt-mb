import React, {useState} from 'react';
import {AmountInput, Button, Separator} from '@app/components/atoms';
import {Header} from '@app/components/atoms/Header';
import {FlexView} from '@app/components/organism';
import i18n from '@app/i18n';
import {useTheme} from '@app/theme';
import {ratioW, screenHeight} from '@app/utils/UDimension';
import {IAuctionScreenProps} from '@app/stacks/types/TNoFooterStack';
import {ScrollView, ViewStyle} from 'react-native';
import {DatePicker} from '@app/components/atoms/Picker';
import mDate, {IDate} from '@app/utils/methods/mDate';
import nftManagement from '@app/api/nftManagement';
import mNumber from '@app/utils/methods/mNumber';
import {
  closeGlobalModal,
  openBottomSheet,
  openGlobalModal,
} from '@app/components/molecules/Modal/function';
import ConfirmBuyModal from '../ConfirmBuyModal';
import LoadingTransaction from '../LoadingTransaction';
import debounce from 'lodash/debounce';
import mText from '@app/utils/methods/mText';
import {showFailMessage} from '@app/utils/UMessage';

const Auction: React.FC<IAuctionScreenProps> = ({route, navigation}) => {
  const {nft} = route.params;
  const {colors} = useTheme();
  const [startingPrice, setStartingPrice] = useState('');
  const [auctionTime, setAuctionTime] = useState<IDate>('');
  const [winningPrice, setWinningPrice] = useState('');

  const disableBtn = !startingPrice || !auctionTime;

  const $mainContainer: ViewStyle = {
    backgroundColor: colors.mainBackground,
    padding: ratioW(16),
    flexGrow: 1,
  };
  const $modal: ViewStyle = {
    backgroundColor: colors.mainBackground,
    maxHeight: screenHeight * 0.6,
    flex: 1,
  };
  const $processModal: ViewStyle = {alignItems: 'stretch', flex: 1};

  const onContinue = () => {
    const onSubmit = () => {
      openGlobalModal({
        containerStyle: $processModal,
        content: (
          <LoadingTransaction
            animateType={'loading'}
            isSeller={true}
            nftName={nft.propertyAddress}
            screenType={'auction'}
          />
        ),
      });
      nftManagement
        .configAuction({
          endTime: auctionTime,
          nftId: nft._id,
          startPrice: Number(mNumber.removeComma(startingPrice)),
          ...(winningPrice && {
            winningPrice: Number(mNumber.removeComma(winningPrice)),
          }),
        })
        .then(() => {
          openGlobalModal({
            containerStyle: $processModal,
            content: (
              <LoadingTransaction
                animateType={'success'}
                isSeller={true}
                nftName={nft.propertyAddress}
                screenType={'auction'}
              />
            ),
          });
          navigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
            isSeller: true,
            nft,
            screenType: 'success',
            type: 'auction',
          });
          debounce(() => {
            closeGlobalModal();
          }, 1000)();
        })
        .catch(() => {
          closeGlobalModal();
          navigation.navigate('CHECKOUT_TRANSACTION_SCREEN', {
            isSeller: true,
            nft,
            screenType: 'failed',
            type: 'auction',
          });
        });
    };
    if (
      !!winningPrice &&
      Number(mNumber.removeComma(startingPrice)) >
        Number(mNumber.removeComma(winningPrice))
    ) {
      showFailMessage(
        i18n.t('Wallet.YourStartingPriceCannotGreaterThanYourWinningPrice'),
      );
    } else {
      if (nft) {
        openBottomSheet({
          element: (
            <ConfirmBuyModal
              modalTitle={i18n.t('Wallet.ListedOnExchange')}
              isShowTotalRoyalty={false}
              buttonTitle={i18n.t('Wallet.ConfirmListedOnExchange')}
              buttonPress={onSubmit}
              itemName={nft.propertyAddress}
              total={String(nft.price)}
            />
          ),
          containerStyles: $modal,
        });
      }
    }
  };

  return (
    <FlexView>
      <Header title={i18n.t('Wallet.Auction')} />
      <Separator height={ratioW(8)} />
      <ScrollView contentContainerStyle={$mainContainer}>
        <FlexView>
          <AmountInput
            label={mText.addRequired(i18n.t('Wallet.StartingPrice'))}
            value={startingPrice}
            onChangeText={setStartingPrice}
            keyboardType={'number-pad'}
            unit={''}
          />
          <Separator height={ratioW(20)} />
          <DatePicker
            onChange={setAuctionTime}
            minimumDate={new Date()}
            value={String(auctionTime)}
            returnValue={mDate.formatDatetime(auctionTime)}
            title={mText.addRequired(i18n.t('Wallet.AuctionTime'))}
            pickerMode="datetime"
          />
          <Separator height={ratioW(20)} />
          <AmountInput
            label={i18n.t('Wallet.BuyItNowPrice')}
            value={winningPrice}
            onChangeText={setWinningPrice}
            keyboardType={'number-pad'}
            unit={''}
          />
        </FlexView>
        <Button
          disabled={disableBtn}
          onPress={onContinue}
          title={i18n.t('common.Continue')}
        />
      </ScrollView>
    </FlexView>
  );
};

export default Auction;
