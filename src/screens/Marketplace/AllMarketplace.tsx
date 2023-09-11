import {FlatList, ListRenderItem} from 'react-native';
import listing from '@app/api/listing';
import React, {useEffect, useState} from 'react';
import params from './constants/params';
import Dispatch from '@app/redux/Dispatch';
import useGetList from '@app/hooks/useGetList';
import {navigate} from '@app/utils/UNavigation';
import {FlexView} from '@app/components/organism';
import RecommendItem from './components/RecommendItem';
import {defaultFlatListProps} from '@app/constants/keys';
import {TButtonAny} from '@app/definitions/TButton';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import RefreshControl from '@app/components/atoms/RefreshControl';
import {IRPGetListFavoriteListing, IRQGetListing} from '@app/definitions/TApi';
import MapboxGL from '@rnmapbox/maps';

interface IAllMarketplace {
  isTrigger: boolean;
  setIsTrigger: TButtonAny<boolean>;
}

const AllMarketplace: React.FC<IAllMarketplace> = ({
  isTrigger,
  setIsTrigger,
}) => {
  const [coordinates, setCoordinates] = useState([0, 0]);

  const {
    data: dataAll,
    onRefresh,
    isLoadMore,
    onLoadMore,
  } = useGetList<IRQGetListing, IRPGetListFavoriteListing>(
    listing.getListing,
    params.listingParams(false, coordinates),
    {
      isUseFocus: true,
    },
  );

  useEffect(() => {
    if (isTrigger) {
      onRefresh();
      setIsTrigger(false);
    }
  }, [isTrigger]);

  const renderItem: ListRenderItem<IRPGetListFavoriteListing> = ({item}) => {
    const itemPress = () =>
      navigate('REAL_ESTATE_DETAIL_SCREEN', {itemId: item.id});
    return <RecommendItem item={item} onPress={itemPress} />;
  };

  const onResetRefresh = () => {
    Dispatch.mkpOnReset?.();
    onRefresh();
  };
  const onUpdate = (currentLocation: MapboxGL.Location) => {
    setCoordinates([
      currentLocation.coords.longitude,
      currentLocation.coords.latitude,
    ]);
  };

  return (
    <FlexView>
      <FlatList
        data={dataAll}
        renderItem={renderItem}
        {...defaultFlatListProps}
        onEndReached={onLoadMore}
        refreshControl={<RefreshControl onRefresh={onResetRefresh} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
      <MapboxGL.UserLocation onUpdate={onUpdate} />
    </FlexView>
  );
};

export default AllMarketplace;
