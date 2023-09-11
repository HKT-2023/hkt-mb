import i18n from '@app/i18n';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {IRPViewNFTDetail} from '@app/definitions/TApi';
import mDate from '@app/utils/methods/mDate';
import mNumber from '@app/utils/methods/mNumber';
import EmptyComponent from '@app/components/atoms/EmptyComponent';
import {RowContainer} from '@app/components/organism';
import {AutoImage} from '@app/components/atoms';
import {REALTokenImg} from '@app/assets/photos';

interface IGeneralTab {
  nft?: IRPViewNFTDetail;
}
const GeneralTab = ({nft}: IGeneralTab) => {
  const {colors} = useTheme();

  const $label: TextStyle = {
    letterSpacing: 0.1,
    color: colors.code,
    marginBottom: ratioW(4),
    ...TPoppinsStyle.H1420Medium,
  };

  const $value = StyleSheet.flatten([
    styles.value,
    {color: colors.headerTitleColor},
  ]);

  const renderPrice = () => {
    if (nft?.salesType?.key) {
      switch (nft.salesType.key) {
        case 'offer':
          return nft?.winningPrice ?? 0;
        case 'bid':
        case 'sellFixedPrice':
          return nft?.price ?? 0;
        default:
          return 0;
      }
    }
  };

  const renderNftType = () => {
    if (!!nft?.nftType) {
      if (nft.nftType === 'buyer' || nft.nftType === 'seller') {
        return i18n.t('NFTDetail.Client');
      } else {
        return nft.nftType;
      }
    } else {
      return '-';
    }
  };

  if (!nft) {
    return <EmptyComponent />;
  }

  return (
    <View style={styles.container}>
      <Text style={$label}>{i18n.t('Wallet.NFTType')}</Text>
      <Text style={$value}>{renderNftType()}</Text>
      <Text style={$label}>{i18n.t('Wallet.PropertyAddress')}</Text>
      <Text style={$value}>
        {!nft?.propertyAddress ? '-' : nft.propertyAddress}
      </Text>
      <Text style={$label}>{i18n.t('Wallet.SalesPrice')}</Text>
      <Text style={$value}>
        {!nft?.salesPrice
          ? '-'
          : mNumber.formatUsaCurrency(nft?.salesPrice ?? 0)}
      </Text>
      <Text style={$label}>{i18n.t('Wallet.SalesDate')}</Text>
      <Text style={$value}>
        {!nft?.salesDate ? '-' : mDate.formatDate(nft?.salesDate)}
      </Text>
      <Text style={$label}>{i18n.t('Wallet.NFTPrice')}</Text>
      {!nft.salesType || !nft.price ? (
        <Text style={$value}>-</Text>
      ) : (
        <RowContainer>
          <AutoImage source={REALTokenImg} style={styles.token} />
          <Text style={$value}>
            {mNumber.formatNumberWithDots(String(renderPrice() ?? '0'))}
          </Text>
        </RowContainer>
      )}
      <Text style={$label}>{i18n.t('Wallet.PointsValue')}</Text>
      <Text style={$value}>
        {!nft?.point
          ? '-'
          : mNumber.formatNumberWithDots(String(nft.point ?? 0))}
      </Text>
      <Text style={$label}>{i18n.t('Wallet.Owner')}</Text>
      <Text style={$value}>{!nft?.ownerName ? '-' : nft.ownerName}</Text>
    </View>
  );
};

export default GeneralTab;

const styles = StyleSheet.create({
  value: {
    letterSpacing: 0.5,
    marginBottom: ratioW(20),
    ...TPoppinsStyle.H1624Regular,
    textTransform: 'capitalize',
  },
  container: {
    marginHorizontal: ratioW(16),
  },
  token: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
});
