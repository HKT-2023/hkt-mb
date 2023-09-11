import i18n from '@app/i18n';
import React from 'react';
import TransferPicker from './TransferPicker';
import {
  View,
  Platform,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import UNavigation from '@app/utils/UNavigation';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TNavigation} from '@app/stacks/types/TStack';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  ratioW,
  useTheme,
  RowContainer,
  openBottomSheet,
} from 'react-native-gin-boilerplate';
import sharedStyles from '@app/sharedStyles';
import {IcActivity, IcPhoto, IcUpdate} from '@app/assets/svg';

export const onTransferNFT = (walletAddress: string, receiverId?: string) => {
  InteractionManager.runAfterInteractions(() => {
    UNavigation.navigate('TRANSFER_NFT_SCREEN', {
      walletId: walletAddress,
      receiverId,
    });
  });
};

export const onTransferToken = (walletAddress: string, receiverId?: string) => {
  InteractionManager.runAfterInteractions(() => {
    UNavigation.navigate('TRANSFER_TOKEN_SCREEN', {
      walletId: walletAddress,
      receiverId,
    });
  });
};

const WalletMenu: React.FC<{walletAddress: string}> = ({walletAddress}) => {
  const navigation = useNavigation<TNavigation>();

  const {colors} = useTheme();

  const $viceSecond: ViewStyle = {
    ...styles.viceSecond,
    backgroundColor: colors.mainBackground,
  };

  const $viceFirst: ViewStyle = {
    height: '100%',
    backgroundColor: '#132E3B',
  };

  const $actionContainer: ViewStyle = {
    ...styles.actionContainer,
    backgroundColor: colors.mainBackground,
  };

  const onTransfer = () => {
    openBottomSheet({
      element: (
        <TransferPicker
          onTransferNFT={() => onTransferNFT(walletAddress)}
          onTransferToken={() => onTransferToken(walletAddress)}
        />
      ),
      containerStyles: {
        minHeight: Platform.OS === 'ios' ? '40%' : '50%',
      },
    });
  };

  const onOpenActivity = () => {
    navigation.navigate('WALLET_ACTIVITY_SCREEN', {});
  };

  const onMyNFT = () => navigation.navigate('MY_NFT_SCREEN', {});

  return (
    <View style={styles.container}>
      <View style={$viceFirst}>
        <View style={$viceSecond} />
      </View>
      <RowContainer style={$actionContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.8}
          onPress={onOpenActivity}>
          <IcActivity />
          <Text style={styles.text}>{i18n.t('common.Activity')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.8}
          onPress={onMyNFT}>
          <IcPhoto />
          <Text style={styles.text}>{i18n.t('Wallet.NFTs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.8}
          onPress={onTransfer}>
          <IcUpdate />
          <Text style={styles.text}>{i18n.t('common.Transfer')}</Text>
        </TouchableOpacity>
      </RowContainer>
    </View>
  );
};

export default React.memo(WalletMenu);

const styles = StyleSheet.create({
  actionContainer: {
    position: 'absolute',
    ...sharedStyles.shadow,
    borderRadius: ratioW(8),
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(8),
    marginHorizontal: ratioW(16),
  },
  container: {
    height: ratioW(80),
  },
  viceSecond: {
    width: '100%',
    bottom: ratioW(-1),
    height: ratioW(40),
    position: 'absolute',
    borderTopLeftRadius: ratioW(8),
    borderTopRightRadius: ratioW(8),
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    letterSpacing: 0.1,
    marginTop: ratioW(14),
    ...TPoppinsStyle.H1420Medium,
  },
});
