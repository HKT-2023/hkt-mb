import {useSelector} from 'react-redux';
import MostRecentNFT from './MostRecentNFT';
import {ScrollView, ViewStyle} from 'react-native';
import React, {useCallback, useState} from 'react';
import userManagement from '@app/api/userManagement';
import RecommendedListings from './RecommendedListings';
import {useFocusEffect} from '@react-navigation/native';
import {TReduxState} from '@app/redux/store/configureStore';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {IRPAgentHomepage, IRPUserHomepage} from '@app/definitions/TApi';
import {
  ratioW,
  Header,
  UMessage,
  FlexView,
  useTheme,
  Separator,
  openLoading,
  closeLoading,
  ViewCondition,
  RefreshControl,
} from 'react-native-gin-boilerplate';

const UserHomepage = () => {
  useChangeStatusBar('light-content');
  const {colors} = useTheme();
  const {role} = useSelector((state: TReduxState) => state.AuthReducer);
  const [dataAgent, setDataAgent] = useState<IRPAgentHomepage>();
  const [dataUser, setDataUser] = useState<IRPUserHomepage>();
  const isVisibleCourse =
    (!!dataAgent?.courses && dataAgent.courses.length > 0) ||
    (!!dataUser && dataUser.courses.length > 0);
  const isVisibleNft = !!dataAgent?.nfts && dataAgent.nfts.length > 0;
  const isVisibleListing = !!dataUser?.listings && dataUser.listings.length > 0;
  const isVisibleVendor =
    (!!dataAgent?.vendors && dataAgent.vendors.length > 0) ||
    (!!dataUser && dataUser.vendors.length > 0);

  const $scroll: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };

  const getData = () => {
    openLoading();
    switch (role) {
      case 'User':
        userManagement
          .userHomepage()
          .then(res => {
            closeLoading();
            setDataUser(res.data);
          })
          .catch(err => {
            closeLoading();
            UMessage.showFailMessage(err);
          });
        break;
      case 'RealifiAgent':
      case 'NonRealiFiAgent': {
        userManagement
          .agentHomepage()
          .then(resp => {
            closeLoading();
            setDataAgent(resp.data);
          })
          .catch(error => {
            closeLoading();
            UMessage.showFailMessage(error);
          });
        break;
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const renderSeparator = () => (
    <Separator width="100%" height={ratioW(8)} backgroundColor={'#EEF5F6'} />
  );
  const renderCourse = () => {
    switch (role) {
      case 'User':
        return dataUser?.courses ?? [];
      case 'RealifiAgent':
      case 'NonRealiFiAgent':
        return dataAgent?.courses ?? [];
      default:
        return [];
    }
  };

  return (
    <FlexView>
      <Header title={'Home'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={$scroll}
        refreshControl={<RefreshControl onRefresh={getData} />}>
        <ViewCondition isVisible={isVisibleNft}>
          {renderSeparator()}
          <MostRecentNFT listNFT={dataAgent?.nfts ?? []} />
        </ViewCondition>
        <ViewCondition isVisible={isVisibleListing}>
          {renderSeparator()}
          <RecommendedListings listListing={dataUser?.listings ?? []} />
        </ViewCondition>
        <ViewCondition isVisible={isVisibleVendor}>
          {renderSeparator()}
        </ViewCondition>
      </ScrollView>
    </FlexView>
  );
};

export default UserHomepage;
