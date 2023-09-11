import {
  FlatList,
  Animated,
  ViewStyle,
  StyleSheet,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React from 'react';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {FlexView} from '@app/components/organism';
import {IRPGetReview} from '@app/definitions/TApi';
import {defaultFlatListProps} from '@app/constants/keys';
import {TButtonAny, TButtonVoid} from '@app/definitions/TButton';
import ReviewItem from '@app/screens/Home/components/ReviewItem';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import RefreshControl from '@app/components/atoms/RefreshControl';

interface IRecentReviewsProps {
  isChild?: boolean;
  isLoadMore: boolean;
  header?: JSX.Element;
  data: IRPGetReview[];
  onLoadMore: TButtonVoid;
  onRefresh?: TButtonVoid;
  onReply?: TButtonAny<IRPGetReview>;
  flatListRef?: React.RefObject<FlatList>;
  onLoadMoreSub?: TButtonAny<IRPGetReview>;
  onScroll?: TButtonAny<NativeSyntheticEvent<NativeScrollEvent>>;
}

const RecentReviews: React.FC<IRecentReviewsProps> = ({
  onScroll,
  onRefresh,
  data,
  isLoadMore,
  onLoadMore,
  isChild,
  header,
  onReply,
  flatListRef,
  onLoadMoreSub,
}) => {
  const {colors} = useTheme();
  const $container: ViewStyle = {
    marginLeft: isChild ? ratioW(40) : 0,
    backgroundColor: colors.mainBackground,
  };

  const renderItem: ListRenderItem<IRPGetReview> = ({item}) => {
    return (
      <ReviewItem item={item} onLoadMore={onLoadMoreSub} onReply={onReply} />
    );
  };

  return (
    <FlexView style={$container}>
      <Animated.FlatList
        data={data}
        bounces={false}
        ref={flatListRef}
        onScroll={onScroll}
        renderItem={renderItem}
        {...defaultFlatListProps}
        onEndReached={onLoadMore}
        ListHeaderComponent={header}
        contentContainerStyle={styles.flatList}
        refreshControl={<RefreshControl onRefresh={onRefresh} />}
        ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
      />
    </FlexView>
  );
};

export default React.memo(RecentReviews);

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
  },
});
