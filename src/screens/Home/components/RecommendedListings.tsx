import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import UNavigation from '@app/utils/UNavigation';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {ratioW, Text} from 'react-native-gin-boilerplate';
import {TReduxState} from '@app/redux/store/configureStore';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';
import RecommendItem from '@app/screens/Marketplace/components/RecommendItem';

interface IRecommendedListings {
  listListing: IRPGetListFavoriteListing[];
}

const RecommendedListings: React.FC<IRecommendedListings> = ({listListing}) => {
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);

  if (role !== 'User') {
    return <React.Fragment />;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{i18n.t('Homepage.RecommendedListings')}</Text>
      {listListing?.map((item, index) => {
        return (
          <RecommendItem
            item={item}
            key={index}
            onPress={() => {
              UNavigation.navigate('REAL_ESTATE_DETAIL_SCREEN', {
                itemId: item.id,
              });
            }}
          />
        );
      })}
    </View>
  );
};

export default React.memo(RecommendedListings);

const styles = StyleSheet.create({
  wrapper: {
    padding: ratioW(16),
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
    marginBottom: ratioW(16),
  },
});
