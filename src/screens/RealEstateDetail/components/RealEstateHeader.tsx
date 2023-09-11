import Favorite from '@app/components/atoms/Favorite';
import IcArrowLeft from '@app/assets/svg/IcArrowLeft';
import IcFlag from '@app/assets/svg/IcFlag';
import IcShare from '@app/assets/svg/RealEstateDetail/IcShare';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {FlexView} from '@app/components/organism';
import {goBack, navigate} from '@app/utils/UNavigation';
import {ratioW} from '@app/utils/UDimension';
import {Separator} from '@app/components/atoms';
import {TButtonAny} from '@app/definitions/TButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/theme';

interface IProps {
  location: string;
  listingId: string;
  favoriteId?: string;
  isFavorite?: boolean;
  animatedValue: Animated.Value;
  onFavorite?: TButtonAny<boolean>;
}

const RealEstateHeader: React.FC<IProps> = ({
  location,
  listingId,
  isFavorite,
  onFavorite,
  favoriteId,
  animatedValue,
}) => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  const onShare = () => {
    // Share.open({
    //   failOnCancel: false,
    //   message: `https://${config.APP_LINK_BRANCH_IO}/listing?id=${listingId}`,
    // });
  };

  const onReport = () => {
    navigate('REPORT_HOUSE_SCREEN', {listingId, location});
  };

  const colorAnimated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', '#FFFFFF'],
    extrapolate: 'clamp',
  });

  const $touchStyle: ViewStyle = {
    ...styles.btnTouchable,
    backgroundColor: colors.mainBackground,
  };

  const $vListButton: ViewStyle = {
    paddingTop: top,
    ...styles.vListButton,
  };

  const $backButton: ViewStyle = {
    ...styles.backButton,
    backgroundColor: colors.mainBackground,
  };

  const onFavoriteChange = (val: boolean) => {
    onFavorite?.(val);
  };

  return (
    <Animated.View style={[$vListButton, {backgroundColor: colorAnimated}]}>
      <TouchableOpacity
        onPress={goBack}
        style={$backButton}
        activeOpacity={0.8}>
        <IcArrowLeft />
      </TouchableOpacity>
      <FlexView style={styles.buttons}>
        <TouchableOpacity
          style={$touchStyle}
          onPress={onShare}
          activeOpacity={0.8}>
          <IcShare />
        </TouchableOpacity>
        <Separator width={ratioW(10)} />
        <Favorite
          favoriteId={favoriteId}
          listingId={listingId}
          isFavorite={isFavorite}
          onChange={onFavoriteChange}
        />
        <Separator width={ratioW(10)} />
        <TouchableOpacity
          style={$touchStyle}
          onPress={onReport}
          activeOpacity={0.8}>
          <IcFlag />
        </TouchableOpacity>
      </FlexView>
    </Animated.View>
  );
};

export default React.memo(RealEstateHeader);

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btnTouchable: {
    width: ratioW(40),
    height: ratioW(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ratioW(20),
  },
  vListButton: {
    zIndex: 999,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: ratioW(8),
    justifyContent: 'space-between',
  },
  backButton: {
    width: ratioW(40),
    height: ratioW(40),
    alignItems: 'center',
    borderRadius: ratioW(20),
    justifyContent: 'center',
  },
});
