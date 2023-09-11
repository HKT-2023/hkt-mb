import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import EmptyComponent from '@app/components/atoms/EmptyComponent';
import {ViewCondition} from '@app/components/organism';
import wrapperNFT, {IWrapperNFTBaseProps} from '@app/HOC/wrapperNFT';
import {TReduxState} from '@app/redux/store/configureStore';
import {ratioW} from '@app/utils/UDimension';
import BuyerView from './Buyer/BuyerView';
import SellerView from './Seller/SellerView';
import {TButtonAny} from '@app/definitions/TButton';
import {IRPListOffer} from '@app/definitions/TApi';
import {useTheme} from '@app/theme';

interface INFTDetailMain extends IWrapperNFTBaseProps {
  selectedOffer: IRPListOffer | null;
  setSelectedOffer: TButtonAny<IRPListOffer | null>;
}
const NFTDetailMain: React.FC<INFTDetailMain> = ({
  item,
  selectedOffer,
  setSelectedOffer,
}) => {
  const {colors} = useTheme();
  const {userId} = useSelector((state: TReduxState) => state.AuthReducer);

  const $content = StyleSheet.flatten([
    styles.content,
    {backgroundColor: colors.mainBackground},
  ]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={$content}>
      <ViewCondition isVisible={!item} style={styles.content}>
        <EmptyComponent />
      </ViewCondition>
      <ViewCondition isVisible={!!item}>
        <ViewCondition isVisible={userId === item?.userId}>
          <SellerView
            item={item}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </ViewCondition>
        <ViewCondition isVisible={userId !== item?.userId}>
          <BuyerView
            item={item}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </ViewCondition>
      </ViewCondition>
    </ScrollView>
  );
};

export default wrapperNFT(NFTDetailMain);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: ratioW(0),
  },
});
