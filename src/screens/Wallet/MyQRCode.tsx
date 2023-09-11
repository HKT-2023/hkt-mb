import React, {useState} from 'react';
import i18n from '@app/i18n';
import {TextStyle, View, ViewStyle} from 'react-native';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {Button, Text} from '@app/components/atoms';
import {Header} from '@app/components/atoms/Header';
import {FlexView, RowContainer, ScrollView} from '@app/components/organism';
import {IMyQRCodeScreenProps} from '@app/stacks/types/TNoFooterStack';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const MyQRCode: React.FC<IMyQRCodeScreenProps> = ({route}) => {
  const {walletAddress} = route.params;
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const [localUri, setLocalUri] = useState('');
  const {colors} = useTheme();
  const renderName = () => {
    if (user?.typeOfUser === 'Vendor') {
      return user?.businessName ?? 'Unknown Name';
    } else {
      return `${user?.firstName ?? 'Unknown'} ${user?.lastName ?? 'Name'}`;
    }
  };

  const $scroll: ViewStyle = {
    flexGrow: 1,
    backgroundColor: colors.soldBackgroundColor,
  };
  const $qrWrapper: ViewStyle = {
    width: ratioW(240),
    height: ratioW(240),
    alignSelf: 'center',
    marginTop: ratioW(50),
    borderRadius: ratioW(20),
    marginBottom: ratioW(40),
    backgroundColor: colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const $inforWrapper: ViewStyle = {
    width: '100%',
    paddingTop: ratioW(16),
    borderRadius: ratioW(4),
    paddingHorizontal: ratioW(16),
    backgroundColor: colors.mainBackground,
  };
  const $lbl: TextStyle = {flex: 1};
  const $value: TextStyle = {flex: 1, textAlign: 'right'};
  const $row: ViewStyle = {
    marginBottom: ratioW(16),
    justifyContent: 'space-between',
  };

  const renderRow = (label: string, value: string) => {
    return (
      <RowContainer style={$row}>
        <Text style={$lbl}>{label}</Text>
        <Text style={$value}>{value}</Text>
      </RowContainer>
    );
  };
  const qrContent = () => {
    return <QRCode value={walletAddress} size={ratioW(213)} />;
  };

  const onShare = () => {
    if (localUri) {
      Share.open({
        failOnCancel: false,
        url: localUri,
      });
    }
  };
  const onCapture = (linkURL: string) => {
    setLocalUri(linkURL);
  };

  return (
    <FlexView>
      <Header title={i18n.t('Wallet.MyQRCode')} />
      <ScrollView contentContainerStyle={$scroll}>
        <FlexView>
          <ViewShot captureMode="mount" onCapture={onCapture}>
            <View style={$qrWrapper}>{qrContent()}</View>
            <View style={$inforWrapper}>
              {renderRow(i18n.t('Wallet.WalletOwner'), renderName())}
              {renderRow(i18n.t('Wallet.WalletAddress'), walletAddress)}
            </View>
          </ViewShot>
        </FlexView>
        <Button title={i18n.t('Wallet.DownloadQRImage')} onPress={onShare} />
      </ScrollView>
    </FlexView>
  );
};

export default MyQRCode;
