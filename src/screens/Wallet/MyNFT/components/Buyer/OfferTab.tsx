import i18n from '@app/i18n';
import React from 'react';
import {ratioW} from '@app/utils/UDimension';
import {RowContainer, ViewCondition} from '@app/components/organism';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {AutoImage, Text} from '@app/components/atoms';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import {
  IRPListOffer,
  IRPViewNFTDetail,
  IRQListOffer,
} from '@app/definitions/TApi';
import useGetList from '@app/hooks/useGetList';
import nftManagement from '@app/api/nftManagement';
import {TButtonAny} from '@app/definitions/TButton';
import IcRadioChecked from '@app/assets/svg/IcRadioChecked';
import IcRadioUnchecked from '@app/assets/svg/IcRadioUnchecked';
import {REALTokenImg} from '@app/assets/photos';
import mNumber from '@app/utils/methods/mNumber';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';

interface IProps {
  nft?: IRPViewNFTDetail;
  setSelectedOffer: TButtonAny<IRPListOffer | null>;
  selectedOffer: IRPListOffer | null;
}

const limit = 1000;
const OfferTab: React.FC<IProps> = ({nft, selectedOffer, setSelectedOffer}) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const isOwner = user?._id === nft?.userId;
  const {data} = useGetList<IRQListOffer, IRPListOffer>(
    nftManagement.listOffers,
    {
      limit: limit,
      NFTId: nft?._id ?? '',
    },
  );

  const $price: TextStyle = {
    ...styles.content,
    color: colors.primaryColor,
  };

  const $titleRow: ViewStyle = {
    alignItems: 'center',
    paddingVertical: ratioW(4),
    paddingHorizontal: ratioW(12),
    justifyContent: 'space-between',
    backgroundColor: colors.transferItemBackground,
  };
  console.log(selectedOffer);

  const renderItem = (index: number, item: IRPListOffer) => {
    return (
      <>
        <Text style={[styles.content, styles.flex04]}>{index + 1}</Text>
        <Text style={[styles.content, styles.flex13]}>
          {item.userOffer.firstName} {item.userOffer.lastName}
        </Text>
        <RowContainer style={styles.flex1}>
          <AutoImage source={REALTokenImg} style={styles.token} />
          <Text style={$price}>
            {mNumber.formatBidValue(String(item?.offer?.price ?? ''), false)}
          </Text>
        </RowContainer>
        <View style={styles.flex02}>
          <ViewCondition isVisible={isOwner}>
            {selectedOffer === item ? <IcRadioChecked /> : <IcRadioUnchecked />}
          </ViewCondition>
        </View>
      </>
    );
  };
  return (
    <View>
      <RowContainer style={$titleRow}>
        <Text style={[styles.title, styles.flex04]}>{i18n.t('common.No')}</Text>
        <Text style={[styles.title, styles.flex13]}>
          {i18n.t('common.Name')}
        </Text>
        <Text style={styles.title}>{i18n.t('common.Price')}</Text>
        <View style={styles.flex02} />
      </RowContainer>
      {data.map((item, index) => {
        const onPress = () => {
          if (selectedOffer === item) {
            setSelectedOffer(null);
          } else {
            setSelectedOffer(item);
          }
        };
        return (
          <>
            {isOwner ? (
              <TouchableOpacity
                key={index}
                style={styles.valueRow}
                onPress={onPress}>
                {renderItem(index, item)}
              </TouchableOpacity>
            ) : (
              <View key={index} style={styles.valueRow}>
                {renderItem(index, item)}
              </View>
            )}
          </>
        );
      })}
    </View>
  );
};

export default OfferTab;

const styles = StyleSheet.create({
  valueRow: {
    paddingVertical: ratioW(12),
    paddingHorizontal: ratioW(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    letterSpacing: 0.15,
    ...TPoppinsStyle.H1624Medium,
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flex: 1,
  },
  flex02: {flex: 0.2},
  flex04: {flex: 0.4},
  flex13: {flex: 1.3},
  token: {
    width: ratioW(24),
    height: ratioW(24),
    marginRight: ratioW(8),
  },
  flex1: {flex: 1},
});
