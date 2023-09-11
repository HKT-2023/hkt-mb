import i18n from '@app/i18n';
import React from 'react';
import {ratioW} from '@app/utils/UDimension';
import {RowContainer} from '@app/components/organism';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {AutoImage, Text} from '@app/components/atoms';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import {
  IRPListBid,
  IRPViewNFTDetail,
  IRQListOffer,
} from '@app/definitions/TApi';
import useGetList from '@app/hooks/useGetList';
import nftManagement from '@app/api/nftManagement';
import {REALTokenImg} from '@app/assets/photos';
import mNumber from '@app/utils/methods/mNumber';
import EmptyComponent from '@app/components/atoms/EmptyComponent';

interface IProps {
  nft?: IRPViewNFTDetail;
}

const limit = 1000;
const BidTab: React.FC<IProps> = ({nft}) => {
  const {colors} = useTheme();
  const {data} = useGetList<IRQListOffer, IRPListBid>(nftManagement.listBid, {
    limit: limit,
    NFTId: nft?._id ?? '',
  });

  const $price: TextStyle = {
    ...styles.content,
    color: colors.primaryColor,
  };

  const $titleRow: ViewStyle = {
    borderBottomWidth: 1,
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
    borderBottomColor: colors.borderColor,
  };

  if (!data.length) {
    return <EmptyComponent />;
  }

  return (
    <View>
      <RowContainer style={$titleRow}>
        <Text style={styles.title}>{i18n.t('common.No')}</Text>
        <Text style={styles.title}>{i18n.t('common.Name')}</Text>
        <Text style={styles.title}>{i18n.t('common.Price')}</Text>
      </RowContainer>
      {data.map((item, index) => {
        return (
          <RowContainer key={index} style={styles.valueRow}>
            <Text style={styles.content}>{index + 1}</Text>
            <Text style={styles.content}>
              {item.userBid.firstName} {item.userBid.lastName}
            </Text>
            <RowContainer style={styles.flex1}>
              <AutoImage source={REALTokenImg} style={styles.token} />
              <Text style={$price}>
                {mNumber.formatBidValue(String(item.bid.price) ?? '', false)}
              </Text>
            </RowContainer>
          </RowContainer>
        );
      })}
    </View>
  );
};

export default BidTab;

const styles = StyleSheet.create({
  valueRow: {
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
  },
  content: {
    flex: 1,
    letterSpacing: 0.15,
    ...TPoppinsStyle.H1624Medium,
  },
  title: {
    flex: 1,
    letterSpacing: 0.15,
    ...TPoppinsStyle.H1624Regular,
  },
  token: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  flex1: {flex: 1},
});
