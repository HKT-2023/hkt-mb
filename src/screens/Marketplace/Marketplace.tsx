import React, {useCallback, useEffect, useState} from 'react';
// import HeaderLogo from '@app/components/atoms/Header/HeaderLogo';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import SearchBar from './components/SearchBar/SearchBar';
import i18n from '@app/i18n';
import listing from '@app/api/listing';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useFocusEffect} from '@react-navigation/native';
// import IcInformation from '@app/assets/svg/IcInformation';
import {IMarketplaceHomeScreenProps} from '@app/stacks/types/TMarketplaceStack';
// import MapBox from '@app/components/organism/Map/MapBox';
// import MapboxGL, {Camera} from '@rnmapbox/maps';
import {IRPGetListFavoriteListing} from '@app/definitions/TApi';
import params from './constants/params';
// import * as turf from '@turf/turf';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';
import Dispatch from '@app/redux/Dispatch';
// import IcHamburger from '@app/assets/svg/IcHamburger';
import mAnimated from '@app/utils/methods/mAnimated';
import {
  closeAlertModal,
  FlexView,
  openAlertModal,
  ratioW,
  Separator,
  Text,
  UMessage,
  useTheme,
} from 'react-native-gin-boilerplate';
import UNavigation from '@app/utils/UNavigation';

const Marketplace: React.FC<IMarketplaceHomeScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const {filterHouseStatus} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );
  const [currentLocation, setCurrentLocation] = useState<number[]>([0, 0]);
  const [dataPin, setDataPin] = useState<IRPGetListFavoriteListing[]>([]);
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [isFocusUser, setIsFocusUser] = useState(false);
  const [isTruncateData, setIsTruncateData] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);
  // const cameraRef = useRef<Camera>(null);
  const animatedHeight = new Animated.Value(0);

  useEffect(() => {
    if (isShowLoading) {
      mAnimated.changeAnimated({
        value: animatedHeight,
        toValue: 1,
        useNativeDriver: true,
      });
    } else {
      mAnimated.changeAnimated({
        value: animatedHeight,
        toValue: 0,
        useNativeDriver: true,
      });
    }
  }, [isShowLoading]);

  const onBackdropPress = () => closeAlertModal();

  const modalZipCode = () => {
    openAlertModal({
      // icon: <IcInformation style={styles.modalIcon} />,
      title: i18n.t(
        'Marketplace.Home.PleaseEnterYourPreferredZipCodesToSeeListingsInThoseAreas',
      ),
      modalProps: {
        onBackdropPress: onBackdropPress,
      },
      rightButtonType: 'success',
      rightButtonTitle: i18n.t('common.Next'),
      titleStyle: [styles.titleModal, {color: '#242424'}],
      descStyle: [styles.descStyle, {color: '#616161'}],
      buttons: {
        onRightAction: () => {
          // navigation.navigate('INTERESTED_AREA_SCREEN', {});
        },
      },
    });
  };

  const getData = () => {
    setIsShowLoading(true);
    listing
      .getListing({
        ...params.listingParams(false, currentLocation, !isTruncateData),
        page: 1,
      })
      .then(resp => {
        if (resp.data && resp.data.length > 0) {
          const newCoords = resp.data.map(e => {
            return [e.longitude, e.latitude];
          });
          if (isTruncateData) {
            setDataPin(resp?.data ?? []);
            setCoordinates(newCoords);
            // const points = turf.points(newCoords);
            // const bbox = points ? turf.bbox(points) : null;
            // if (bbox) {
            //   cameraRef.current?.fitBounds(
            //     [bbox[0], bbox[1]],
            //     [bbox[2], bbox[3]],
            //     [50, 50],
            //     500,
            //   );
            // }
            setIsTruncateData(false);
          } else {
            setDataPin(value => {
              let temp = [...value];
              temp = temp.concat(resp.data ?? []);
              return temp;
            });
            setCoordinates(val => {
              let tmp = [...val];
              tmp = tmp.concat(newCoords);
              return tmp;
            });
            setIsTruncateData(false);
          }
        }
        setIsShowLoading(false);
      })
      .catch(error => {
        setIsShowLoading(false);
        UMessage.showFailMessage(error);
      });
  };

  useEffect(() => {
    getData();
  }, [isTrigger]);

  useEffect(() => {
    Dispatch.mkpSetFilterHouseStatus(['forSale']);
  }, []);

  useFocusEffect(
    useCallback(() => {
      listing
        .getInterestArea()
        .then(res => {
          if (res.data && !res.data.length) {
            modalZipCode();
          }
        })
        .catch(error => {
          UMessage.showFailMessage(String(error));
        });
      return () => {
        Dispatch.mkpSetBoundingBox('');
        if (
          filterHouseStatus?.length &&
          filterHouseStatus.length === 1 &&
          filterHouseStatus[0] === 'forSale'
        ) {
          Dispatch.mkpSetFilterHouseStatus([]);
        }
      };
    }, []),
  );

  const $marketplaceContainer = {
    backgroundColor: colors.mainBackground,
  };
  const $locationBtn = StyleSheet.flatten([
    styles.locationBtn,
    {backgroundColor: '#132E3B'},
  ]);
  const $loadingContainer: Animated.AnimatedProps<StyleProp<ViewStyle>> = {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 0,
    borderTopLeftRadius: ratioW(16),
    borderTopRightRadius: ratioW(16),
    backgroundColor: colors.mainBackground,
    paddingTop: ratioW(10),
    paddingBottom: ratioW(5),
    paddingHorizontal: ratioW(30),
    transform: [{scale: animatedHeight}],
  };

  const onUpdate = () => {
    setIsTruncateData(true);
    setIsTrigger(!isTrigger);
  };

  const onOpenList = () => {
    UNavigation.navigate('SUB_MARKETPLACE_SCREEN', {});
  };

  return (
    <FlexView style={$marketplaceContainer}>
      {/*<HeaderLogo />*/}
      <SearchBar
        isHideNearest={true}
        onTrigger={onUpdate}
        isShowFilterSort={true}
        isShowUserLocation={true}
        isFocusUser={isFocusUser}
        setIsFocusUser={setIsFocusUser}
        searchIconColor={colors.menuText}
        wrapperStyles={styles.mainContainer}
      />
      <Separator
        width="100%"
        height={ratioW(12)}
        backgroundColor={'transparent'}
      />
      {/*<MapBox*/}
      {/*  dataList={dataPin}*/}
      {/*  listCoordinates={coordinates}*/}
      {/*  getCurrentLocation*/}
      {/*  setIsFocusUser={setIsFocusUser}*/}
      {/*  isFocusUser={isFocusUser}*/}
      {/*  onForceUpdate={onForceUpdate}*/}
      {/*  cameraRef={cameraRef}*/}
      {/*/>*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onOpenList}
        style={$locationBtn}>
        {/*<IcHamburger />*/}
      </TouchableOpacity>
      <Animated.View style={$loadingContainer}>
        <ActivityIndicator color={colors.activeColor} />
        <Separator width={ratioW(8)} />
        <Text>{i18n.t('common.Loading')}</Text>
      </Animated.View>
      {/*<MapboxGL.UserLocation onUpdate={onUpdateUserLoc} />*/}
    </FlexView>
  );
};

export default Marketplace;

const styles = StyleSheet.create({
  scene: {
    marginVertical: 0,
  },
  tabView: {
    marginHorizontal: ratioW(16),
  },
  mainContainer: {
    marginHorizontal: ratioW(16),
  },
  titleModal: {
    ...TPoppinsStyle.H2028Bold,
    fontSize: 22,
  },
  descStyle: {
    ...TPoppinsStyle.H1420Regular,
  },
  modalIcon: {
    alignSelf: 'center',
  },
  locationBtn: {
    height: ratioW(56),
    width: ratioW(56),
    borderRadius: ratioW(28),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ratioW(22),
    bottom: ratioW(20),
  },
});
