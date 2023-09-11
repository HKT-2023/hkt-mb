import React, {useEffect} from 'react';
import {DeviceEventEmitter, FlatList, ListRenderItem} from 'react-native';
import {
  IRPGetListFavorite,
  IRPGetListFavoriteListing,
} from '@app/definitions/TApi';
import useGetList from '@app/hooks/useGetList';
import {navigate} from '@app/utils/UNavigation';
import {IRQMeta} from '@app/definitions/TResponse';
import SavedHomeItem from './components/SavedHomeItem';
import favoriteManagement from '@app/api/favoriteManagement';
import {
  defaultFlatListProps,
  EMIT_REMOVE_FAVORITE_MKP,
  LIMIT,
} from '@app/constants/keys';
import RefreshControl from '@app/components/atoms/RefreshControl';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import {FlexView} from '@app/components/organism';

const SavedHomeMarketplace = () => {
  const {data, onRefresh, isLoadMore, onLoadMore, setData} = useGetList<
    Partial<IRQMeta>,
    IRPGetListFavorite
  >(favoriteManagement.getListFavourite, {limit: LIMIT});

  const renderItem: ListRenderItem<IRPGetListFavorite> = ({item}) => {
    const itemPress = () =>
      navigate('REAL_ESTATE_DETAIL_SCREEN', {itemId: item.listingId});
    return <SavedHomeItem item={item} onPress={itemPress} />;
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(
      EMIT_REMOVE_FAVORITE_MKP,
      ({item, isAdd}: {item: string; isAdd: boolean}) => {
        const _item = JSON.parse(item) as IRPGetListFavoriteListing;
        if (isAdd) {
          setData(val => {
            const tmp = [...val];
            if (_item.favorite) {
              tmp.unshift(_item.favorite as unknown as IRPGetListFavorite);
            }
            return tmp;
          });
        } else {
          setData(val => {
            const tmp = [...val];
            return tmp.filter(e => e.listingId !== _item.id);
          });
        }
      },
    );
    return () => {
      DeviceEventEmitter.removeAllListeners(EMIT_REMOVE_FAVORITE_MKP);
    };
  }, []);

  return (
    <FlexView>
      <FlatList
        data={data}
        renderItem={renderItem}
        {...defaultFlatListProps}
        onEndReached={onLoadMore}
        refreshControl={<RefreshControl onRefresh={onRefresh} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
    </FlexView>
  );
};

export default SavedHomeMarketplace;
