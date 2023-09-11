import ButtonBottom from './components/ButtonBottom';
import debounce from 'lodash/debounce';
import DescriptionRealEstate from './components/DescriptionRealEstate';
import EmptyComponent from '@app/components/atoms/EmptyComponent';
import EstimateModal from './components/EstimateModal';
import EstimateProcessing from './EstimateProcessing';
import EstimationRealEstate from './components/EstimationRealEstate';
import i18n from '@app/i18n';
import listing from '@app/api/listing';
import HiddenOption from '@app/components/atoms/HiddenOption';
import houseEstimation from '@app/api/houseEstimation';
import MapViewRealEstate from './components/MapViewRealEstate';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import RealEstateHeader from './components/RealEstateHeader';
import RealEstateMain from './components/RealEstateMain';
import styles from './styles/realEstateStyles';
import Tour3DRealEstate from './components/Tour3DRealEstate';
import useChangeStatusBar from '@app/hooks/useChangeStatusBar';
import {Animated, DeviceEventEmitter, TouchableOpacity} from 'react-native';
import {
  CHANGE_TAB_REAL_ESTATE,
  EMIT_REMOVE_FAVORITE_MKP,
} from '@app/constants/keys';
import {IRealEstateDetailScreenProps} from '@app/stacks/types/TNoFooterStack';
import {TReduxState, store} from '@app/redux/store/configureStore';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  IAgent,
  IRPGetListEstimation,
  IRPGetListFavoriteListing,
} from '@app/definitions/TApi';
import TabViewComponent, {
  SceneProps,
} from '@app/components/molecules/TabView/TabViewComponent';
import {
  IRealEstateDetailContextProps,
  RealEstateDetailContext,
} from '@app/context';
import {Header} from '@app/components/atoms/Header';

export const REAL_ESTATE_TABS = {
  REAL_ESTATE_DETAIL_DESCRIPTION: 'REAL_ESTATE_DETAIL_DESCRIPTION',
  REAL_ESTATE_DETAIL_MAP_VIEW: 'REAL_ESTATE_DETAIL_MAP_VIEW',
  REAL_ESTATE_DETAIL_PHOTO_3D_TOUR: 'REAL_ESTATE_DETAIL_PHOTO_3D_TOUR',
  REAL_ESTATE_DETAIL_ESTIMATE_HISTORY: 'REAL_ESTATE_DETAIL_ESTIMATE_HISTORY',
};

type TRealEstate =
  | 'REAL_ESTATE_DETAIL_DESCRIPTION'
  | 'REAL_ESTATE_DETAIL_MAP_VIEW'
  | 'REAL_ESTATE_DETAIL_PHOTO_3D_TOUR'
  | 'REAL_ESTATE_DETAIL_ESTIMATE_HISTORY';

interface IRealEstate {
  key: TRealEstate;
  title: string;
}

const RealEstateRoute: IRealEstate[] = [
  {
    key: 'REAL_ESTATE_DETAIL_DESCRIPTION',
    title: i18n.t('RealEstateDetail.Description.Description'),
  },
  {
    key: 'REAL_ESTATE_DETAIL_MAP_VIEW',
    title: i18n.t('RealEstateDetail.MapView'),
  },
  {
    key: 'REAL_ESTATE_DETAIL_PHOTO_3D_TOUR',
    title: i18n.t('RealEstateDetail.Photo3DTour'),
  },
  {
    key: 'REAL_ESTATE_DETAIL_ESTIMATE_HISTORY',
    title: i18n.t('RealEstateDetail.EstimationHistory.title'),
  },
];

const RealEstateDetail: React.FC<IRealEstateDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {colors} = useTheme();
  useChangeStatusBar('light-content');

  const {itemId} = route.params;
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {forLease, forSale} = store.getState().MKPFilterReducer;
  const role = user?.typeOfUser ?? 'User';
  const [index, setIndex] = useState<number>(0);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isEstimation, setIsEstimation] = useState(false);
  const [item, setItem] = useState<IRPGetListFavoriteListing>();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [estimationTop, setEstimationTop] = useState<IRPGetListEstimation[]>(
    [],
  );
  const location = [coordinates, [item?.longitude ?? 0, item?.latitude ?? 0]];
  const animatedRef = useRef(new Animated.Value(0));
  const [isFavorite, setIsFavorite] = useState(false);
  const [listAgent, setListAgent] = useState<IAgent[]>([]);

  const getListingDetail = async (isEmit?: boolean, isAdd?: boolean) => {
    listing
      .listingDetail(itemId)
      .then(res => {
        closeLoading();
        setItem(res?.data);
        setIsFavorite(Boolean(res?.data?.favorite?._id));
        setListAgent(res?.data?.agents ?? []);
        if (
          !!res?.data?.coListAgentFirstName &&
          !!res?.data?.coListAgentLastName &&
          !!res?.data?.coListAgentStateLicense &&
          !!res?.data?.coListOfficeName &&
          res?.data?.coListAgentStateLicense !==
            res?.data?.listAgentStateLicense
        ) {
          setListAgent(val => {
            let tmp = [...val];
            tmp = tmp.concat(
              {
                _id: '',
                avatarUrl: '',
                firstName: res?.data?.listAgentFirstName ?? '',
                lastName: res?.data?.listAgentLastName ?? '',
                listAgentMlsId: res?.data?.listAgentStateLicense ?? '',
                typeOfUser: 'NonRealifiAgent',
                businessName: res?.data?.listOfficeName ?? '',
              },
              {
                _id: res?.data?.coListAgentMlsId ?? '',
                avatarUrl: '',
                firstName: res?.data?.coListAgentFirstName ?? '',
                lastName: res?.data?.coListAgentLastName ?? '',
                listAgentMlsId: res?.data?.coListAgentStateLicense ?? '',
                typeOfUser: 'NonRealifiAgent',
                businessName: res?.data?.coListOfficeName ?? '',
              },
            );
            return tmp;
          });
        } else {
          setListAgent(val => {
            let tmp = [...val];
            tmp = tmp.concat({
              _id: res?.data?.coListAgentMlsId ?? '',
              avatarUrl: '',
              firstName: res?.data?.listAgentFirstName ?? '',
              lastName: res?.data?.listAgentLastName ?? '',
              listAgentMlsId: res?.data?.listAgentStateLicense ?? '',
              typeOfUser: 'NonRealifiAgent',
              businessName: res?.data?.listOfficeName ?? '',
            });
            return tmp;
          });
        }
        if (isEmit) {
          DeviceEventEmitter.emit(EMIT_REMOVE_FAVORITE_MKP, {
            item: JSON.stringify(res?.data),
            isAdd,
          });
        }
      })
      .catch(err => {
        closeLoading();
        showFailMessage(String(err));
      });
  };
  const getEstimationStatus = async () => {
    listing
      .checkEstimation(itemId)
      .then(res => {
        if (res.data) {
          setIsCheckIn(true);
          if (res.data.price) {
            setIsEstimation(true);
          } else {
            setIsEstimation(false);
          }
        } else {
          setIsCheckIn(false);
        }
      })
      .catch(err => {
        showFailMessage(err);
      });
  };
  const getEstimateTop = () => {
    houseEstimation
      .getListOfEstimations({
        limit: 5,
        listingId: itemId,
        sortByPrice: '-1',
      })
      .then(res => setEstimationTop(res.data ?? []))
      .catch(err => showFailMessage(String(err)));
  };

  useFocusEffect(
    useCallback(() => {
      openLoading();
      getEstimationStatus();
      getListingDetail();
      getEstimateTop();
    }, []),
  );

  useEffect(() => {
    DeviceEventEmitter.addListener(CHANGE_TAB_REAL_ESTATE, (action: string) => {
      const fIndex = RealEstateRoute.findIndex(e => e.key === action);
      setIndex(fIndex);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners(CHANGE_TAB_REAL_ESTATE);
    };
  }, []);

  const renderScene = ({route: tabRoute}: SceneProps): JSX.Element => {
    switch (tabRoute.key) {
      case 'REAL_ESTATE_DETAIL_DESCRIPTION':
        return (
          <HiddenOption index={index} excludeIndex={0}>
            <DescriptionRealEstate listAgent={listAgent} />
          </HiddenOption>
        );
      case 'REAL_ESTATE_DETAIL_MAP_VIEW':
        return (
          <HiddenOption index={index} excludeIndex={1}>
            <MapViewRealEstate
              coordinate={[
                [item?.longitude ?? 0, item?.latitude ?? 0],
                [item?.longitude ?? 0, item?.latitude ?? 0],
              ]}
            />
          </HiddenOption>
        );
      case 'REAL_ESTATE_DETAIL_PHOTO_3D_TOUR':
        return (
          <HiddenOption index={index} excludeIndex={2}>
            <Tour3DRealEstate />
          </HiddenOption>
        );
      case 'REAL_ESTATE_DETAIL_ESTIMATE_HISTORY':
        return (
          <HiddenOption index={index} excludeIndex={3}>
            <EstimationRealEstate data={estimationTop} />
          </HiddenOption>
        );
      default:
        return <React.Fragment />;
    }
  };

  const $sceneStyle = {backgroundColor: colors.mainBackground, marginTop: 0};
  const $realEstateContainer = {backgroundColor: colors.mainBackground};
  const $tabBar = {backgroundColor: colors.mainBackground};
  const $vImgBackground = {
    width: '100%',
    height: ratioW(300),
  };

  const onContact = () =>
    navigation.navigate('CONTACT_AGENT_SCREEN', {
      listingId: item?.id ?? '',
      location: item?.location ?? '',
    });
  const onRequestTour = () =>
    navigation.navigate('REQUEST_TOUR_SCREEN', {
      listingId: item?.id ?? '',
      location: item?.location ?? '',
    });
  const onEstimate = () => {
    if (item?.id) {
      openBottomSheet({
        containerStyles: styles.modal,
        element: <EstimateModal houseId={item?.id} />,
      });
    }
  };
  const checkPermission = async () => {
    RNPermissions.checkMultiple([
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ])
      .then(statuses => {
        if (Object.values(statuses).some(e => e === RESULTS.GRANTED)) {
          onCheckIn();
        } else {
          throw new Error('failed');
        }
      })
      .catch(message => {
        if (message) {
          showAlert({
            description: i18n.t('common.RealiFiUsesYourDevicesLocation'),
            title: i18n.t('common.AllowLocationAccessInDevicesSettings'),
            positiveAction: () => {
              RNPermissions.openSettings();
            },
          });
        }
      });
  };
  const checkCheckIn = () => {
    if (!!item?.id && !!item?.longitude && !!item.latitude) {
      houseEstimation
        .checkIn({
          listingId: item?.id,
          userGpsLat: coordinates[1],
          userGpsLong: coordinates[0],
        })
        .then(res => {
          if (res.data === true) {
            openGlobalModal({
              containerStyle: styles.processModal,
              content: <EstimateProcessing screenType={'SuccessCheckIn'} />,
            });
            setIsCheckIn(!isCheckIn);
          } else {
            openGlobalModal({
              containerStyle: styles.processModal,
              content: (
                <EstimateProcessing
                  screenType={'Failed'}
                  coordinate={location}
                />
              ),
            });
          }
        })
        .catch(err => {
          closeGlobalModal();
          showFailMessage(err);
        });
    } else {
      closeGlobalModal();
      showFailMessage(i18n.t('RealEstateDetail.FailedToCheckinPleaseTryAgain'));
    }
  };
  const onCheckIn = () => {
    openGlobalModal({
      containerStyle: styles.processModal,
      content: <EstimateProcessing screenType={'Process'} showBack={false} />,
    });
    debounce(() => checkCheckIn(), 1000)();
  };
  const onUpdate = (currentLocation: MapboxGL.Location) => {
    setCoordinates([
      currentLocation.coords.longitude,
      currentLocation.coords.latitude,
    ]);
  };

  const value: IRealEstateDetailContextProps = useMemo(() => ({item}), [item]);

  const onFavorite = (fvt: boolean) => {
    setIsFavorite(fvt);
    debounce(() => {
      getListingDetail(true, fvt);
    }, 250)();
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: animatedRef.current}}}],
    {useNativeDriver: false},
  );

  const onPressImage = () =>
    DeviceEventEmitter.emit(
      CHANGE_TAB_REAL_ESTATE,
      REAL_ESTATE_TABS.REAL_ESTATE_DETAIL_PHOTO_3D_TOUR,
    );

  const renderSeparator = () => {
    return (
      <Separator
        height={ratioW(8)}
        width="100%"
        backgroundColor={colors.transferItemBackground}
      />
    );
  };

  if (!item) {
    return (
      <FlexView style={$realEstateContainer}>
        <Header title="" />
        <EmptyComponent />
      </FlexView>
    );
  }

  const isForLeaseAndActive = () => {
    if (!!item && item.propertyType && !!forLease?.length) {
      if (
        forLease?.includes(item.propertyType) &&
        item.listingStatus === 'Active'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const isForSaleAndActive = () => {
    if (!!item && item.propertyType && !!forSale?.length) {
      if (
        forSale?.includes(item.propertyType) &&
        item.listingStatus === 'Active'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <RealEstateDetailContext.Provider value={value}>
      <FlexView style={$realEstateContainer}>
        <RealEstateHeader
          listingId={itemId}
          onFavorite={onFavorite}
          isFavorite={isFavorite}
          location={item.location}
          favoriteId={item?.favorite?._id}
          animatedValue={animatedRef.current}
        />
        <Animated.ScrollView
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={onPressImage} style={$vImgBackground}>
            <AutoImage
              uri={item?.thumbnail ?? ''}
              resizeMode="cover"
              style={$vImgBackground}
            />
          </TouchableOpacity>
          <RealEstateMain
            item={item}
            isForLeaseAndActive={isForLeaseAndActive()}
          />
          {renderSeparator()}
          <TabViewComponent
            index={index}
            styleTabBar={$tabBar}
            routes={RealEstateRoute}
            onChangeIndex={setIndex}
            sceneStyle={$sceneStyle}
            renderScene={renderScene}
          />
          {renderSeparator()}
        </Animated.ScrollView>
        <ButtonBottom
          role={role}
          onContact={onContact}
          isCheckIn={isCheckIn}
          onEstimate={onEstimate}
          isEstimation={isEstimation}
          onCheckin={checkPermission}
          onRequestTour={onRequestTour}
          isAgentAssigned={item?.isAssignedRealifiAgent ?? false}
          isForSaleAndActive={isForSaleAndActive()}
        />
        <MapboxGL.UserLocation onUpdate={onUpdate} />
      </FlexView>
    </RealEstateDetailContext.Provider>
  );
};

export default RealEstateDetail;
