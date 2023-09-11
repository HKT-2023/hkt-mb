import i18n from '@app/i18n';
import Item from './components/Item';
import WalletMenu from './components/WalletMenu';
import React, {useCallback, useState} from 'react';
import {keyExtractor, LIMIT} from '@app/constants/keys';
import AccountBalance from './components/AccountBalance';
import {IWalletScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  SectionList,
  ListRenderItem,
} from 'react-native';
import wallet from '@app/api/wallet';
import SectionHeader from './components/SectionHeader';
import {useFocusEffect} from '@react-navigation/native';
import {
  IRPMyWallet,
  IRQListActivity,
  IRPListActivity,
} from '@app/definitions/TApi';
import _ from 'lodash';
import mDate from '@app/utils/methods/mDate';
import useGetList from '@app/hooks/useGetList';
import useGetBalance from '@app/hooks/useGetBalance';
import activityManagement from '@app/api/activityManagement';
import {
  ratioW,
  FlexView,
  useTheme,
  EmptyComponent,
  RefreshControl,
} from 'react-native-gin-boilerplate';
import {HeaderCommon} from '@app/components/atoms/Header';
import {FooterFlatList} from '@app/components/atoms';

const Wallet: React.FC<IWalletScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const routes = navigation.getState().routes;

  const [walletDetail, setWalletDetail] = useState<IRPMyWallet>();
  const {data, onRefresh, isLoadMore, onLoadMore} = useGetList<
    IRQListActivity,
    IRPListActivity
  >(
    activityManagement.listActivity,
    {limit: LIMIT},
    {isTrigger: true, isUseFocus: true},
  );
  const {userBalance, userHba, forceLoad, setForceLoad} = useGetBalance();
  const showBack = routes.some(e => e.name === 'WALLET_SCREEN');

  const convertedData = _(data)
    .groupBy(tran => mDate.formatDate(tran.createdAt, mDate.FORMAT_DATE_WALLET))
    .map(function (items, date) {
      return {
        title: date,
        data: items,
      };
    })
    .value();

  const $headerContainer: ViewStyle = {
    backgroundColor: '#132E3B',
  };
  const $headerTitle: TextStyle = {
    color: colors.mainBackground,
  };
  const $flex: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };

  const renderItem: ListRenderItem<IRPListActivity> = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  useFocusEffect(
    useCallback(() => {
      wallet.myWallet().then(res => {
        if (res.data) {
          setWalletDetail(res.data);
        }
      });
    }, []),
  );

  const onRefreshList = () => {
    onRefresh();
    setForceLoad(!forceLoad);
  };

  return (
    <FlexView style={$flex}>
      <HeaderCommon
        isShowBack={showBack}
        titleStyle={$headerTitle}
        title={i18n.t('Wallet.title')}
        containerStyle={$headerContainer}
        backIconColor={colors.mainBackground}
      />
      <FlexView style={styles.$container}>
        <AccountBalance
          hba={userHba ?? 0}
          realToken={userBalance ?? 0}
          address={walletDetail?.accountId ?? ''}
        />
        <WalletMenu walletAddress={walletDetail?.accountId ?? ''} />
        <SectionList
          sections={convertedData}
          style={styles.section}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.content}
          renderSectionHeader={({section}) => (
            <SectionHeader title={section.title} />
          )}
          onEndReached={onLoadMore}
          ListEmptyComponent={EmptyComponent}
          refreshControl={<RefreshControl onRefresh={onRefreshList} />}
          ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
        />
      </FlexView>
    </FlexView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  $container: {},
  content: {
    paddingHorizontal: ratioW(16),
  },
  section: {
    marginTop: ratioW(10),
  },
});
