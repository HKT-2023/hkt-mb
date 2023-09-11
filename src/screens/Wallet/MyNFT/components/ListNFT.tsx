import wallet from '@app/api/wallet';
import React, {useEffect} from 'react';
import {useMyNFTContext} from '@app/context';
import useGetList from '@app/hooks/useGetList';
import {FlatList, ListRenderItem} from 'react-native';
import NFTItem from '@app/components/atoms/NFT/NFTItem';
import {IRPViewNFT, IRQViewNFT} from '@app/definitions/TApi';
import {defaultFlatListProps, LIMIT} from '@app/constants/keys';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import {
  FlexView,
  Separator,
  TButtonAny,
  RefreshControl,
} from 'react-native-gin-boilerplate';

interface IListNFT {
  onPress?: TButtonAny<IRPViewNFT>;
  listNotSaleOnly?: boolean;
  isSearchModal?: boolean;
  searchModal?: string;
  setSearchModal?: TButtonAny<string>;
}

const ListNFT = ({
  onPress,
  listNotSaleOnly = false,
  isSearchModal,
  searchModal,
  setSearchModal,
}: IListNFT) => {
  const {searchText, isTrigger, setSearchText} = useMyNFTContext();
  const {
    data,
    onRefresh,
    isLoadMore,
    onLoadMore,
    isForceUpdate,
    setIsForceUpdate,
  } = useGetList<IRQViewNFT, IRPViewNFT>(
    wallet.viewListNFT,
    {
      ...(!!searchText && {search: searchText}),
      ...(!!searchModal && {search: searchModal}),
      ...(!listNotSaleOnly && {isContainMKP: true}),
      limit: LIMIT,
    },
    {isTrigger: true},
  );

  useEffect(() => {
    setIsForceUpdate(!isForceUpdate);
  }, [isTrigger, isSearchModal]);

  const renderItem: ListRenderItem<IRPViewNFT> = ({item, index}) => {
    return <NFTItem item={item} index={index} onGetItem={onPress} />;
  };
  const renderSeparator = () => <Separator height={16} />;

  const onRefreshReset = () => {
    setSearchText?.('');
    setSearchModal?.('');
    onRefresh?.();
  };

  return (
    <FlexView>
      <FlatList
        {...defaultFlatListProps}
        data={data}
        numColumns={2}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={onLoadMore}
        refreshControl={<RefreshControl onRefresh={onRefreshReset} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
    </FlexView>
  );
};

export default ListNFT;
