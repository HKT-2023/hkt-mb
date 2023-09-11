import {
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import i18n from '@app/i18n';
import React, {useState} from 'react';
import debounce from 'lodash/debounce';
import mNumber from '@app/utils/methods/mNumber';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Text,
  ratioW,
  useTheme,
  RowContainer,
  AutoImage,
} from 'react-native-gin-boilerplate';
import {RETImg} from '@app/assets/photos';
import {IcKlaytn} from '@app/assets/svg';

interface IAccountBalance {
  address: string;
  realToken: number;
  hba: number;
  style?: ViewStyle;
}

const AccountBalance: React.FC<IAccountBalance> = ({
  realToken,
  address,
  hba,
  style,
}) => {
  const {colors} = useTheme();
  const [isCopy, setIsCopy] = useState(false);

  const $container: ViewStyle = {
    ...styles.container,
    backgroundColor: '#132E3B',
    ...style,
  };
  const $title: TextStyle = {
    ...styles.title,
    color: colors.mainBackground,
  };
  const $realToken: TextStyle = {
    ...styles.realToken,
    color: colors.mainBackground,
  };
  const $address: TextStyle = {
    ...styles.address,
    color: colors.mainBackground,
  };
  const $addressWrapper: ViewStyle = {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ratioW(8),
    backgroundColor: '#425862',
    borderRadius: ratioW(8),
  };

  const onPressAddress = () => {
    Clipboard.setString(address);
    setIsCopy(true);
    debounce(() => {
      setIsCopy(false);
    }, 1000)();
  };

  const addressRender = () => {
    if (!isCopy) {
      return <Text style={$address}>{address}</Text>;
    } else {
      return <Text style={$address}>{i18n.t('common.Copied')}</Text>;
    }
  };

  return (
    <View style={$container}>
      <Text style={$title}>{i18n.t('Wallet.AvailableBalance')}</Text>
      <RowContainer style={styles.balanceContainer}>
        <AutoImage source={RETImg} style={styles.token} />
        <Text style={$realToken}>
          {mNumber.formatNumberWithDots(String(realToken))}
        </Text>
      </RowContainer>
      <RowContainer style={styles.balanceContainer}>
        <IcKlaytn />
        <Text style={$realToken}>
          {mNumber.formatNumberWithDots(String(hba))}
        </Text>
      </RowContainer>
      <TouchableOpacity style={$addressWrapper} onPress={onPressAddress}>
        {addressRender()}
      </TouchableOpacity>
    </View>
  );
};

export default AccountBalance;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    letterSpacing: 0.1,
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(8),
  },
  address: {
    textAlign: 'center',
    letterSpacing: 0.1,
    ...TPoppinsStyle.H1420Medium,
  },
  realToken: {
    textAlign: 'center',
    ...TPoppinsStyle.H3248Medium,
  },
  point: {
    textAlign: 'center',
    letterSpacing: 0.5,
    ...TPoppinsStyle.H1624Regular,
    marginBottom: ratioW(20),
  },
  balanceWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    ...TPoppinsStyle.H2028Bold,
  },
  container: {
    paddingHorizontal: ratioW(20),
    justifyContent: 'space-between',
    paddingBottom: ratioW(20),
  },
  token: {
    height: ratioW(32),
    width: ratioW(32),
    marginRight: ratioW(8),
    borderRadius: ratioW(16),
  },
  balanceContainer: {alignSelf: 'center', alignItems: 'center'},
});
