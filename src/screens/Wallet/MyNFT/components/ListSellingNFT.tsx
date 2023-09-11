import React, {useEffect} from 'react';
import {useMyNFTContext} from '@app/context';
import useGetList from '@app/hooks/useGetList';
import nftManagement from '@app/api/nftManagement';
import {FlatList, ListRenderItem} from 'react-native';
import NFTItem from '@app/components/atoms/NFT/NFTItem';
import {
  FlexView,
  Separator,
  TButtonAny,
  RefreshControl,
} from 'react-native-gin-boilerplate';
import {defaultFlatListProps, LIMIT} from '@app/constants/keys';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import {IRPViewNFT, IRQNFTMarketplace} from '@app/definitions/TApi';

interface IListSellingNFT {
  onPress?: TButtonAny<IRPViewNFT>;
}

const ListSellingNFT = ({onPress}: IListSellingNFT) => {
  const {searchText, isTrigger} = useMyNFTContext();
  const {
    data,
    onRefresh,
    isLoadMore,
    onLoadMore,
    isForceUpdate,
    setIsForceUpdate,
  } = useGetList<IRQNFTMarketplace, IRPViewNFT>(
    nftManagement.getNFTMarketplace,
    {
      ...(!!searchText && {search: searchText}),
      limit: LIMIT,
      isMyNFT: true,
    },
  );

  useEffect(() => {
    setIsForceUpdate(!isForceUpdate);
  }, [isTrigger]);

  const renderItem: ListRenderItem<IRPViewNFT> = ({item, index}) => {
    return <NFTItem item={item} index={index} onGetItem={onPress} />;
  };
  const renderSeparator = () => <Separator height={16} />;

  return (
    <FlexView>
      <FlatList
        {...defaultFlatListProps}
        data={data}
        numColumns={2}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={onLoadMore}
        refreshControl={<RefreshControl onRefresh={onRefresh} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
    </FlexView>
  );
};

export default ListSellingNFT;
