import i18n from '@app/i18n';
import IcX from '@app/assets/svg/IcX';
import React from 'react';
import {closeBottomSheet} from '@app/components/molecules/Modal/function';
import {dNFTSellType} from '@app/_dummy/dNFTFiltering';
import {FlexView, RowContainer} from '@app/components/organism';
import {ISellType, TNFTFilteringKey} from '@app/definitions/TFilter';
import {keyExtractor} from '@app/constants/keys';
import {ratioW} from '@app/utils/UDimension';
import {TButtonAny} from '@app/definitions/TButton';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import {Text} from '@app/components/atoms';
import {
  View,
  FlatList,
  ViewStyle,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {navigate} from '@app/utils/UNavigation';
import {IRPViewNFTDetail} from '@app/definitions/TApi';

interface ISellTypeProps {
  value: TNFTFilteringKey;
  onChangeValue?: TButtonAny<TNFTFilteringKey>;
  nft: IRPViewNFTDetail;
  isSeller: boolean;
}

const SellType: React.FC<ISellTypeProps> = props => {
  const {colors} = useTheme();

  const $headerWrapper: ViewStyle = {
    ...styles.headerWrapper,
    borderBottomColor: colors.borderColor,
  };

  const $iconWrap: ViewStyle = {
    width: ratioW(40),
    height: ratioW(40),
    alignItems: 'center',
    marginRight: ratioW(12),
    borderRadius: ratioW(20),
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
  };

  const $itemWrap: ViewStyle = {
    padding: ratioW(16),
    borderRadius: ratioW(8),
    marginBottom: ratioW(16),
    backgroundColor: colors.transferItemBackground,
  };

  const renderItem: ListRenderItem<ISellType> = ({item}) => {
    const onItemPress = () => {
      closeBottomSheet();
      switch (item.key) {
        case 'sellFixedPrice':
          navigate('ENTER_AMOUNT_SCREEN', {
            nft: props.nft,
            type: 'fixedPrice',
            isSeller: props.isSeller,
          });
          break;
        case 'bid':
          navigate('AUCTION_SCREEN', {nft: props.nft});
          break;
        case 'offer':
          navigate('ENTER_AMOUNT_SCREEN', {
            nft: props.nft,
            type: 'offer',
            isSeller: props.isSeller,
          });
          break;
        default:
          break;
      }
    };

    return (
      <TouchableOpacity style={$itemWrap} onPress={onItemPress}>
        <RowContainer>
          <View style={$iconWrap}>{item.icon}</View>
          <FlexView>
            <Text style={styles.itemTitle}>{item.value}</Text>
            <Text style={styles.itemSubtitle}>{item.value}</Text>
          </FlexView>
        </RowContainer>
      </TouchableOpacity>
    );
  };

  return (
    <FlexView>
      <RowContainer style={$headerWrapper}>
        <Text style={styles.title}>Sell</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <IcX width={ratioW(30)} height={ratioW(30)} />
        </TouchableOpacity>
      </RowContainer>
      <FlexView style={styles.content}>
        <Text style={styles.desc}>
          {i18n.t('NFTDetail.PleaseChooseYourMethodBelow')}
        </Text>
        <FlatList
          data={dNFTSellType}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </FlexView>
    </FlexView>
  );
};

export default SellType;

const styles = StyleSheet.create({
  title: {
    ...TPoppinsStyle.H1624Medium,
    flex: 1,
  },
  itemTitle: {
    ...TPoppinsStyle.H1420Medium,
    flex: 1,
  },
  itemSubtitle: {
    ...TPoppinsStyle.H1216Regular,
    flex: 1,
  },
  desc: {
    ...TPoppinsStyle.H1420Medium,
    letterSpacing: 0.1,
    marginBottom: ratioW(16),
  },
  content: {
    padding: ratioW(16),
  },
  headerWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(20),
  },
});
