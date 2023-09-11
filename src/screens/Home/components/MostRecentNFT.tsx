import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import sharedStyles from '@app/sharedStyles';
import {StyleSheet, View} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {INFTExchange} from '@app/definitions/INFTs';
import NFTItem from '@app/components/atoms/NFT/NFTItem';
import {TReduxState} from '@app/redux/store/configureStore';
import {ratioW, Text} from 'react-native-gin-boilerplate';

interface IMostRecentNFT {
  listNFT: INFTExchange[];
}

const MostRecentNFT: React.FC<IMostRecentNFT> = ({listNFT}) => {
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);

  if (role && !['NonRealiFiAgent', 'RealifiAgent'].includes(role)) {
    return <React.Fragment />;
  }

  return (
    <View>
      <Text style={styles.title}>{i18n.t('Homepage.MostRecentNFT')}</Text>
      <View style={styles.container}>
        {listNFT?.map((item, index) => (
          <View key={index} style={styles.itemWrapper}>
            <NFTItem item={item} index={index} style={styles.NFTItem} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(MostRecentNFT);

const styles = StyleSheet.create({
  itemWrapper: {
    width: '50%',
    marginBottom: ratioW(8),
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
    margin: ratioW(16),
  },
  NFTItem: {
    width: 'auto',
    flex: 0,
    ...sharedStyles.shadow,
  },
});
