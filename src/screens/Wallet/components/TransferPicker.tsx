import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import i18n from '@app/i18n';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {
  Text,
  ratioW,
  useTheme,
  FlexView,
  TButtonVoid,
  RowContainer,
  closeBottomSheet,
} from 'react-native-gin-boilerplate';
import {IcClose, IcGenerate, IcQr} from '@app/assets/svg';

interface ITransferPicker {
  onTransferNFT: TButtonVoid;
  onTransferToken: TButtonVoid;
}

const TransferPicker: React.FC<Partial<ITransferPicker>> = ({
  onTransferNFT,
  onTransferToken,
}) => {
  const {colors} = useTheme();

  const $iconWrapper: ViewStyle = {
    width: ratioW(36),
    height: ratioW(36),
    alignItems: 'center',
    marginRight: ratioW(9),
    borderRadius: ratioW(18),
    justifyContent: 'center',
    backgroundColor: colors.activeColor,
  };

  const $wrapper: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ratioW(16),
    backgroundColor: '#EEF5F6',
    marginTop: ratioW(20),
    borderRadius: ratioW(8),
  };

  const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.mainBackground,
  };

  const $headerTitle: TextStyle = {
    color: '#15191B',
    letterSpacing: 0.15,
    ...TPoppinsStyle.H1624Medium,
  };

  const $header: ViewStyle = {
    ...styles.header,
    borderBottomColor: colors.inputInactiveBorder,
  };

  const _onTransferNFT = () => {
    closeBottomSheet();
    onTransferNFT?.();
  };

  const _onTransferToken = () => {
    closeBottomSheet();
    onTransferToken?.();
  };

  return (
    <View style={$container}>
      <RowContainer style={$header}>
        <Text style={$headerTitle}>{i18n.t('common.Transfer')}</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <IcClose width={ratioW(24)} height={ratioW(24)} />
        </TouchableOpacity>
      </RowContainer>
      <FlexView style={styles.content}>
        <Text>{i18n.t('Wallet.PleaseChooseYourTransferMethodBelow')}</Text>
        <TouchableOpacity style={$wrapper} onPress={_onTransferNFT}>
          <View style={$iconWrapper}>
            <IcQr />
          </View>
          <View>
            <Text style={styles.title}>{i18n.t('Wallet.TransferNFT')}</Text>
            <Text style={styles.body}>{i18n.t('Wallet.TransferNFT')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={$wrapper} onPress={_onTransferToken}>
          <View style={$iconWrapper}>
            <IcGenerate />
          </View>
          <View>
            <Text style={styles.title}>{i18n.t('Wallet.TransferTokens')}</Text>
            <Text style={styles.body}>{i18n.t('Wallet.TransferTokens')}</Text>
          </View>
        </TouchableOpacity>
      </FlexView>
    </View>
  );
};

export default React.memo(TransferPicker);

const styles = StyleSheet.create({
  content: {
    padding: ratioW(16),
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: ratioW(16),
    justifyContent: 'space-between',
  },
  title: {
    letterSpacing: 0.1,
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1420Medium,
  },
  body: {
    letterSpacing: 0.4,
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1216Regular,
  },
});
