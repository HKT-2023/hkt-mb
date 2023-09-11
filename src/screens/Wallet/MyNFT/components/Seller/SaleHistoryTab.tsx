import EmptyComponent from '@app/components/atoms/EmptyComponent';
import i18n from '@app/i18n';
import React from 'react';
import {AutoImage, Text} from '@app/components/atoms';
import {
  IRPListSale,
  IRPViewNFTDetail,
  IRQListOffer,
} from '@app/definitions/TApi';
import {ratioW} from '@app/utils/UDimension';
import {REALTokenImg} from '@app/assets/photos';
import {RowContainer} from '@app/components/organism';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import useGetList from '@app/hooks/useGetList';
import nftManagement from '@app/api/nftManagement';
import mNumber from '@app/utils/methods/mNumber';

interface IProps {
  nft?: IRPViewNFTDetail;
}
const limit = 1000;
const SaleHistoryTab: React.FC<IProps> = ({nft}) => {
  const {colors} = useTheme();
  const {data} = useGetList<IRQListOffer, IRPListSale>(nftManagement.listSale, {
    limit,
    NFTId: nft?._id ?? '',
  });

  if (!data.length) {
    return <EmptyComponent />;
  }

  const $row: ViewStyle = {
    ...styles.row,
    borderBottomWidth: 1,
    paddingVertical: ratioW(10),
    paddingHorizontal: ratioW(12),
    borderBottomColor: colors.borderColor,
  };

  const $headerRow: ViewStyle = {
    alignItems: 'center',
    paddingVertical: ratioW(4),
    paddingHorizontal: ratioW(12),
    justifyContent: 'space-between',
    backgroundColor: colors.transferItemBackground,
  };

  return (
    <View>
      <RowContainer style={$headerRow}>
        <Text style={[styles.title, styles.flex04]}>{i18n.t('common.No')}</Text>
        <Text style={[styles.title, styles.flex15]}>
          {i18n.t('NFTDetail.WalletAddress')}
        </Text>
        <Text style={styles.title}>{i18n.t('common.Price')}</Text>
      </RowContainer>
      {data.map((item, index) => {
        return (
          <RowContainer key={index} style={$row}>
            <Text style={[styles.value, styles.flex04]}>{index + 1}</Text>
            <Text style={[styles.value, styles.flex15]}>{item.name ?? ''}</Text>
            <RowContainer style={styles.tokenRow}>
              <AutoImage source={REALTokenImg} style={styles.token} />
              <Text style={styles.value}>
                {mNumber.formatBidValue(String(item?.price) ?? '', false)}
              </Text>
            </RowContainer>
          </RowContainer>
        );
      })}
    </View>
  );
};

export default React.memo(SaleHistoryTab);

const styles = StyleSheet.create({
  title: {
    ...TPoppinsStyle.H1624Medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flex: 1,
  },
  value: {
    flex: 1,
    ...TPoppinsStyle.H1420Regular,
    letterSpacing: 0.5,
  },
  tokenRow: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  token: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  flex04: {flex: 0.4},
  flex15: {flex: 1.5},
});
