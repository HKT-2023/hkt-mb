import i18n from '@app/i18n';
import React, {useEffect, useState} from 'react';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {ITransferNFTScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  View,
  Modal,
  TextStyle,
  ViewStyle,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import wallet from '@app/api/wallet';
import {useSelector} from 'react-redux';
import mText from '@app/utils/methods/mText';
import NFTPicker from './components/NFTPicker';
import {IRPViewNFT} from '@app/definitions/TApi';
import nftManagement from '@app/api/nftManagement';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TReduxState} from '@app/redux/store/configureStore';
import SuccessTransaction from './Activity/components/SuccessTransaction';
import {
  Text,
  Button,
  ratioW,
  FlexView,
  UMessage,
  useTheme,
  AutoImage,
  TextInput,
  openAlertModal,
  openGlobalModal,
  closeAlertModal,
  closeGlobalModal,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {IcFile, IcWarning} from '@app/assets/svg';
import {HeaderCommon} from '@app/components/atoms/Header';
import EstimateProcessing from "@app/screens/RealEstateDetail/EstimateProcessing";

const TransferNFT: React.FC<ITransferNFTScreenProps> = ({
  route,
  navigation,
}) => {
  const {walletId, receiverId} = route.params;
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const [receiver, setReceiver] = useState(receiverId ?? '');
  const [nft, setNft] = useState<IRPViewNFT>();
  const [memo, setMemo] = useState('');
  const [gasFee, setGasFee] = useState(0);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const btnDisable = !nft || !receiver;

  useEffect(() => {
    nftManagement
      .estimateFee()
      .then(res => {
        if (res.data) {
          setGasFee(res.data?.gasFee);
        }
      })
      .catch(err => UMessage.showFailMessage(err));
  }, []);

  useChangeStatusBar('light-content');

  const $input: ViewStyle = {
    marginBottom: ratioW(16),
  };
  const $picker: ViewStyle = {
    ...styles.picker,
    borderColor: colors.inputInactiveBorder,
  };
  const $iconWrapper: ViewStyle = {
    ...styles.iconWrapper,
    backgroundColor: '#F5F5F5',
  };
  const $content: ViewStyle = {
    flexGrow: 1,
    padding: ratioW(16),
    marginTop: ratioW(8),
    backgroundColor: colors.mainBackground,
  };
  const $modal: ViewStyle = {alignItems: 'stretch', flex: 1};
  const $selectNFT: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    color: '#15191B',
  };
  const $nftName: TextStyle = {
    ...TPoppinsStyle.H1624Medium,
    textAlign: 'center',
    color: '#000000',
  };
  const $icon: ViewStyle = {
    alignSelf: 'center',
  };

  const onHidePick = () => {
    setIsPickerVisible(false);
  };
  const onGetId = (item: IRPViewNFT) => {
    setNft(item);
    onHidePick();
  };
  const onPick = () => {
    setIsPickerVisible(true);
  };
  const onConfirm = () => {
    if (nft?._id) {
      openGlobalModal({
        containerStyle: $modal,
        content: <EstimateProcessing screenType={'Process'} showBack={false} />,
      });
      wallet
        .sendNFT({
          receiveAccount: receiver,
          NFTId: nft?._id,
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
    }
  };
  const onSubmit = () => {
    if (user?.isVerifyPhone) {
      navigation.navigate('ENTER_OTP_SCREEN', {onButtonPress: onConfirm});
    } else {
      navigation.navigate('TWO_FA_AUTHENTICATION_SCREEN', {});
    }
  };
  const onChangeReceiver = (inputReceiver: string) => {
    setReceiver(inputReceiver.trimStart());
  };
  const onChangeMemo = (inputMemo: string) => {
    setMemo(inputMemo.trimStart());
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

  const renderNft = () => {
    if (!nft?.name || !nft?.images) {
      return (
        <>
          <View style={$iconWrapper}>
            <IcFile />
          </View>
          <Text style={$selectNFT}>{i18n.t('Wallet.SelectYourNFT')}</Text>
        </>
      );
    } else {
      return (
        <View style={styles.alignCenter}>
          <AutoImage uri={nft.images} style={styles.nftImage} />
          <Text style={$nftName}>{nft.name}</Text>
        </View>
      );
    }
  };

  return (
    <FlexView>
      <HeaderCommon title={i18n.t('common.Transfer')} />
      <ScrollView contentContainerStyle={$content}>
        <FlexView>
          <TextInput
            containerStyles={$input}
            label={mText.addRequired(i18n.t('Wallet.WalletOwner'))}
            value={walletId}
            editable={false}
          />
          <TextInput
            containerStyles={$input}
            label={mText.addRequired(i18n.t('Wallet.WalletAddress'))}
            value={receiver}
            onChangeText={onChangeReceiver}
          />
          <TouchableOpacity
            style={$picker}
            activeOpacity={0.8}
            onPress={onPick}>
            {renderNft()}
          </TouchableOpacity>
          <TextInput
            value={String(gasFee)}
            containerStyles={$input}
            label={mText.addRequired(i18n.t('Wallet.Fees'))}
            // leftIcon={<AutoImage source={HBA} style={styles.leftIconInput} />}
            editable={false}
          />
          <TextInput
            containerStyles={$input}
            label={i18n.t('Wallet.Memo')}
            value={memo}
            onChangeText={onChangeMemo}
          />
        </FlexView>
        <Button
          title={i18n.t('common.Transfer')}
          onPress={!memo ? onOpenWarning : onSubmit}
          disabled={btnDisable}
        />
      </ScrollView>
      <Modal visible={isPickerVisible} transparent={true} style={styles.modal}>
        <NFTPicker onPress={onGetId} onHide={onHidePick} />
      </Modal>
    </FlexView>
  );
};

export default withKeyboardAvoidingView(TransferNFT);

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  iconWrapper: {
    padding: ratioW(8),
    borderRadius: ratioW(12),
    marginBottom: ratioW(10),
  },
  modal: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  picker: {
    borderWidth: 1,
    padding: ratioW(16),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: ratioW(8),
    justifyContent: 'center',
    marginBottom: ratioW(16),
  },
  nftImage: {
    width: ratioW(96),
    height: ratioW(96),
    borderRadius: ratioW(12),
    marginBottom: ratioW(8),
  },
  leftIconInput: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(12),
  },
});
