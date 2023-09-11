import React from 'react';
import i18n from '@app/i18n';
import {Text} from '@app/components/atoms';
import ReviewSubItem from './ReviewSubItem';
import {ratioW} from '@app/utils/UDimension';
import {IRPGetReview} from '@app/definitions/TApi';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TButtonAny} from '@app/definitions/TButton';
import {ViewCondition} from '@app/components/organism';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

interface IReviewItemProps {
  item: IRPGetReview;
  onLoadMore?: TButtonAny<IRPGetReview>;
  onReply?: TButtonAny<IRPGetReview>;
}

const ReviewItem: React.FC<IReviewItemProps> = ({
  item,
  onLoadMore,
  onReply,
}) => {
  const $viewMoreWrapper: ViewStyle = {marginLeft: ratioW(110)};
  const $viewMore: TextStyle = {
    ...TPoppinsStyle.H1420Medium,
    marginVertical: ratioW(8),
  };

  const _onLoadMore = () => {
    onLoadMore?.(item);
  };

  const renderMain = () => {
    if (item?.subReviews && item.subReviews.length > 0) {
      const isShowLoadMore =
        !!item?.totalSubReviews &&
        item.totalSubReviews > 4 &&
        item.subReviews.length < item.totalSubReviews;
      return (
        <View>
          {item.subReviews.map((subItem, index) => {
            return <ReviewSubItem key={index} data={subItem} isChild={true} />;
          })}
          <ViewCondition isVisible={isShowLoadMore}>
            <TouchableOpacity style={$viewMoreWrapper} onPress={_onLoadMore}>
              <Text style={$viewMore}>{i18n.t('common.ViewMore')}</Text>
            </TouchableOpacity>
          </ViewCondition>
        </View>
      );
    }
  };

  return (
    <View>
      <ReviewSubItem data={item} isChild={false} onReply={onReply} />
      {renderMain()}
    </View>
  );
};

export default React.memo(ReviewItem);
