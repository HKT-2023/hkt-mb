import DetailedNFTButton from './components/DetailedNFTButton';
import React, {ComponentType} from 'react';
import {
  IRPListBid,
  IRPListOffer,
  IRPViewNFTDetail,
} from '@app/definitions/TApi';
import {TReduxState} from '@app/redux/store/configureStore';
import {useSelector} from 'react-redux';
import {View, ViewStyle} from 'react-native';

export interface IWrapperNFTBaseProps {
  item: IRPViewNFTDetail;
  style?: ViewStyle;
  listOffer?: IRPListOffer[];
  selectedOffer?: IRPListOffer | null;
  listBid?: IRPListBid[];
}

const wrapperNFT = <T extends IWrapperNFTBaseProps>(
  Component: ComponentType<T>,
) => {
  return (props: T): JSX.Element => {
    const item = props?.item;
    const listOffers = props.listOffer;
    const selectedOffer = props.selectedOffer;
    const {userId} = useSelector((state: TReduxState) => state.AuthReducer);
    const isSeller = userId === item?.userId;
    const hasOffer =
      listOffers && listOffers?.filter(e => userId === e.userOffer._id);

    return (
      <View style={props.style}>
        <Component {...props} />
        <DetailedNFTButton
          salesType={item?.salesType?.key}
          isSeller={isSeller}
          item={item}
          userOffer={hasOffer ?? []}
          selectedOffer={selectedOffer ?? null}
          listBid={props?.listBid ?? []}
        />
      </View>
    );
  };
};

export default wrapperNFT;
