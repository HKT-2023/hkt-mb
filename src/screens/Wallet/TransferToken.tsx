import i18n from '@app/i18n';
import wallet from '@app/api/wallet';
import {useSelector} from 'react-redux';
import mText from '@app/utils/methods/mText';
import React, {useEffect, useState} from 'react';
import mNumber from '@app/utils/methods/mNumber';
import mWallet from '@app/utils/methods/mWallet';
import {ViewStyle, ScrollView} from 'react-native';
import nftManagement from '@app/api/nftManagement';
import useGetBalance from '@app/hooks/useGetBalance';
import {TReduxState} from '@app/redux/store/configureStore';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import SuccessTransaction from './Activity/components/SuccessTransaction';
import {ITransferTokenScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  Button,
  ratioW,
  useTheme,
  FlexView,
  UMessage,
  TextInput,
  openAlertModal,
  closeAlertModal,
  openGlobalModal,
  closeGlobalModal,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {IcWarning} from '@app/assets/svg';
import {HeaderCommon} from '@app/components/atoms/Header';
import EstimateProcessing from '@app/screens/RealEstateDetail/EstimateProcessing';

const TransferToken: React.FC<ITransferTokenScreenProps> = ({
  route,
  navigation,
}) => {
  const {walletId, receiverId} = route.params;
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {userBalance} = useGetBalance();

  const [amount, setAmount] = useState('');
  const [estimatedFees, setEstimatedFees] = useState(0);
  const [receiver, setReceiver] = useState(receiverId ?? '');
  const [memo, setMemo] = useState('');
  const btnDisable = !amount || !receiver;
  const amountError = !!amount && Number(mNumber.removeComma(amount)) < 5;

  useEffect(() => {
    nftManagement
      .estimateFee()
      .then(res => {
        if (res.data) {
          setEstimatedFees(res.data?.gasFee);
        }
      })
      .catch(err => UMessage.showFailMessage(err));
  }, []);

  useChangeStatusBar('light-content');

  const $input: ViewStyle = {
    marginBottom: ratioW(16),
  };
  const $content: ViewStyle = {
    flexGrow: 1,
    marginTop: ratioW(8),
    padding: ratioW(16),
    backgroundColor: colors.mainBackground,
  };
  const $modal: ViewStyle = {alignItems: 'stretch', flex: 1};
  const $icon: ViewStyle = {
    alignSelf: 'center',
  };

  const onTransfer = () => {
    openGlobalModal({
      containerStyle: $modal,
      content: <EstimateProcessing screenType={'Process'} showBack={false} />,
    });
    wallet
      .sendToken({
        accountId: receiver,
        amount: Number(mNumber.removeComma(amount)),
        ...(!!memo && {memo: memo}),
      })
      .then(() => {
        openGlobalModal({
          containerStyle: $modal,
          content: <SuccessTransaction />,
        });
      })
      .catch(err => {
        closeGlobalModal();
        UMessage.showFailMessage(String(err));
      });
  };
  const onSubmit = () => {
    mWallet.checkEnoughBalance(
      userBalance ?? 0,
      Number(mNumber.removeComma(amount)),
      () => {
        if (user?.isVerifyPhone) {
          navigation.navigate('ENTER_OTP_SCREEN', {onButtonPress: onTransfer});
        } else {
          navigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
        }
      },
    );
  };
  const onChangeReceiver = (inputReceiver: string) => {
    setReceiver(inputReceiver.trimStart());
  };
  const onChangeMemo = (inputMemo: string) => {
    setMemo(inputMemo.trimStart());
  };
  const onChangeAmount = (inputAmount: string) => {
    setAmount(mNumber.formatBidValue(inputAmount, true, true));
  };
  const onOpenWarning = () => {
    openAlertModal({
      title: i18n.t('common.Alert'),
      desc: i18n.t('Wallet.PleaseBeAdvisedThatAMemoMayBeRequired'),
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
        onRightAction: onSubmit,
      },
    });
  };

  return (
    <FlexView>
      <HeaderCommon title={i18n.t('common.Transfer')} />
      <ScrollView contentContainerStyle={$content}>
        <FlexView>
          <TextInput
            value={walletId}
            editable={false}
            containerStyles={$input}
            label={mText.addRequired(i18n.t('Wallet.WalletOwner'))}
          />
          <TextInput
            value={receiver}
            containerStyles={$input}
            onChangeText={onChangeReceiver}
            label={mText.addRequired(i18n.t('Wallet.WalletAddress'))}
          />
          <TextInput
            value={amount}
            containerStyles={$input}
            keyboardType={'number-pad'}
            onChangeText={onChangeAmount}
            label={mText.addRequired(i18n.t('Wallet.Amount'))}
            isError={amountError}
            errorText={i18n.t('Wallet.TheMinimumOfTransferAmountIs5REAL')}
          />
          <TextInput
            editable={false}
            containerStyles={$input}
            value={String(estimatedFees)}
            label={mText.addRequired(i18n.t('Wallet.EstimatedFees'))}
            // leftIcon={<AutoImage source={HBA} style={styles.leftIconInput} />}
          />
          <TextInput
            value={memo}
            containerStyles={$input}
            onChangeText={onChangeMemo}
            label={i18n.t('Wallet.Memo')}
          />
        </FlexView>
        <Button
          onPress={!memo ? onOpenWarning : onSubmit}
          disabled={btnDisable}
          title={i18n.t('common.Transfer')}
        />
      </ScrollView>
    </FlexView>
  );
};

export default withKeyboardAvoidingView(TransferToken);
