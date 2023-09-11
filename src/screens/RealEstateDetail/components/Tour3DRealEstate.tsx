import React from 'react';
import {AutoImage} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import {ratioW} from '@app/utils/UDimension';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ic3d from '@app/assets/svg/Ic3d';
import {navigate} from '@app/utils/UNavigation';
import {useRealEstateDetailContext} from '@app/context';
import EmptyComponent from '@app/components/atoms/EmptyComponent';

const Tour3DRealEstate = () => {
  const {item} = useRealEstateDetailContext();

  const onPress3d = () => {
    navigate('IMAGE_VIEW_SCREEN', {
      index: 1,
      imageList: item?.photo,
      virtualURL: item?.virtualTourURLZillow,
    });
  };

  const $3dWrapper = StyleSheet.flatten([
    styles.imageWrapper,
    {
      paddingRight:
        ((item?.photo?.length ?? 1) - 1) % 2 ? ratioW(8) : ratioW(16),
      paddingLeft:
        ((item?.photo?.length ?? 1) - 1) % 2 ? ratioW(16) : ratioW(8),
    },
  ]);

  return (
    <RowContainer style={styles.imageContainer}>
      {item && item?.photo?.length ? (
        item?.photo.map((_item, index) => {
          const $imageWrapper = StyleSheet.flatten([
            styles.imageWrapper,
            {
              paddingRight: index % 2 ? ratioW(16) : ratioW(8),
              paddingLeft: index % 2 ? ratioW(8) : ratioW(16),
            },
          ]);
          const onPressPhoto = () => {
            navigate('IMAGE_VIEW_SCREEN', {
              index: 0,
              clickedIndex: index,
              imageList: item?.photo,
              virtualURL: item?.virtualTourURLZillow,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPressPhoto}
              style={$imageWrapper}>
              <AutoImage uri={_item.MediaURL} style={styles.image} />
            </TouchableOpacity>
          );
        })
      ) : (
        <EmptyComponent />
      )}
      {item && item?.photo?.length && !!item?.virtualTourURLZillow ? (
        <TouchableOpacity style={[$3dWrapper]} onPress={onPress3d}>
          <View>
            <AutoImage uri={item?.photo?.[0].MediaURL} style={styles.image} />
            <View style={styles.icon3dContainer}>
              <Ic3d />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <React.Fragment />
      )}
    </RowContainer>
  );
};

export default Tour3DRealEstate;

const styles = StyleSheet.create({
  imageContainer: {
    flexWrap: 'wrap',
    marginVertical: ratioW(8),
  },
  image: {
    borderRadius: ratioW(8),
    width: '100%',
    height: ratioW(182),
  },
  imageWrapper: {
    width: '50%',
    paddingVertical: ratioW(8),
  },
  icon3dContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
