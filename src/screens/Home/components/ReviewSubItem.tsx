import React from 'react';
import i18n from '@app/i18n';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import mDate from '@app/utils/methods/mDate';
import {ImageStyle} from 'react-native-fast-image';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TButtonAny} from '@app/definitions/TButton';
import {AutoImage, Text} from '@app/components/atoms';
import {IRPGetReview} from '@app/definitions/TApi';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {FlexView, RowContainer, ViewCondition} from '@app/components/organism';

interface IReviewSubItem {
  isChild: boolean;
  data: IRPGetReview;
  onReply?: TButtonAny<IRPGetReview>;
}

const ReviewSubItem: React.FC<IReviewSubItem> = ({isChild, data, onReply}) => {
  const {colors} = useTheme();
  const size = isChild ? 32 : 40;

  const $avatar: ImageStyle = {
    width: ratioW(size),
    height: ratioW(size),
    marginRight: ratioW(12),
    borderRadius: ratioW(size / 2),
  };

  const $commentWrapper: ViewStyle = {
    marginBottom: ratioW(8),
    borderRadius: ratioW(8),
    paddingVertical: ratioW(8),
    borderWidth: data?.isError ? 1 : 0,
    paddingHorizontal: ratioW(12),
    backgroundColor: colors.transferItemBackground,
    borderColor: data?.isError ? colors.dangerColor : 'transparent',
  };

  const $container: ViewStyle = {
    paddingTop: ratioW(16),
    paddingHorizontal: ratioW(16),
    marginLeft: !isChild ? 0 : ratioW(50),
  };

  const _onReply = () => {
    onReply?.({
      _id: data?._id,
      subReviews: [],
      totalSubReviews: 0,
      comment: data?.comment,
      userInfo: data?.userInfo,
      vendorId: data?.vendorId,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      vendorCateId: data?.vendorCateId,
    });
  };

  return (
    <View style={$container}>
      <RowContainer style={styles.row}>
        <AutoImage uri={data?.userInfo?.avatarUrl} style={$avatar} />
        <FlexView>
          <View style={$commentWrapper}>
            <Text style={styles.name}>{data?.userInfo?.fullName}</Text>
            <Text>{data?.comment}</Text>
          </View>
          <RowContainer style={styles.bottomRow}>
            <Text style={styles.date}>
              {mDate.formatDate(data?.createdAt, mDate.FORMAT_DATE_REVIEW)}
            </Text>
            <ViewCondition isVisible={!isChild && !data?.isError}>
              <RowContainer>
                <Text style={styles.date}>•</Text>
                <TouchableOpacity onPress={_onReply} activeOpacity={0.8}>
                  <Text style={styles.date}>{i18n.t('common.Reply')}</Text>
                </TouchableOpacity>
              </RowContainer>
            </ViewCondition>
          </RowContainer>
        </FlexView>
      </RowContainer>
    </View>
  );
};

export default ReviewSubItem;

const styles = StyleSheet.create({
  bottomRow: {
    alignItems: 'center',
  },
  row: {
    marginBottom: ratioW(12),
  },
  name: {
    letterSpacing: 0.1,
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
  },
  date: {
    ...TPoppinsStyle.H1216Medium,
    letterSpacing: 0.5,
    marginLeft: ratioW(16),
  },
});
