import i18n from '@app/i18n';
import React, {useCallback, useState} from 'react';
import wallet from '@app/api/wallet';
import {FlexView} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import {INFTDetailScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  IRPListBid,
  IRPListOffer,
  IRPViewNFTDetail,
  IRQListOffer,
} from '@app/definitions/TApi';
import Loading from '@app/components/molecules/Loading/function';
import NFTDetailMain from './components/NFTDetailMain';
import useGetList from '@app/hooks/useGetList';
import nftManagement from '@app/api/nftManagement';
import {ViewStyle} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {EmptyNFTItem} from '../../../constants/keys';

const limit = 1000;
const NFTDetail: React.FC<INFTDetailScreenProps> = ({route}) => {
  const {itemId} = route.params;
  const [item, setItem] = useState<IRPViewNFTDetail>();
  const [selectedOffer, setSelectedOffer] = useState<IRPListOffer | null>(null);
  const {data} = useGetList<IRQListOffer, IRPListOffer>(
    nftManagement.listOffers,
    {
      limit: limit,
      NFTId: itemId ?? '',
    },
  );
  const {data: listBid} = useGetList<IRQListOffer, IRPListBid>(
    nftManagement.listBid,
    {
      limit: limit,
      NFTId: itemId ?? '',
    },
  );
  useFocusEffect(
    useCallback(() => {
      setItem(EmptyNFTItem);
      Loading.open();
      wallet
        .viewNFTDetail(itemId)
        .then(res => {
          if (res.data) {
            setItem(res.data);
          }
          Loading.close();
        })
        .catch(() => Loading.close());
    }, []),
  );

  const $container: ViewStyle = {flex: 1};

  return (
    <FlexView>
      <Header title={item?.propertyAddress ?? i18n.t('Wallet.NFTDetail')} />
      {item && (
        <NFTDetailMain
          item={item}
          style={$container}
          listOffer={data}
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
          listBid={listBid}
        />
      )}
    </FlexView>
  );
};

export default NFTDetail;
