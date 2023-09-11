import React, {useState} from 'react';
import {IHouseDetailScreenProps} from '@app/stacks/types/TNoFooterStack';
import {FlexView, RowContainer} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import i18n from '@app/i18n';
import {
  AmountInput,
  AutoImage,
  Separator,
  Text,
  TextInput,
} from '@app/components/atoms';
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ratioW, screenWidth} from '@app/utils/UDimension';
import Button from '@app/components/atoms/Button/Button';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import mText from '@app/utils/methods/mText';
import {
  closeAlertModal,
  closeGlobalModal,
  openAlertModal,
  openGlobalModal,
} from '@app/components/molecules/Modal/function';
import EstimateProcessing from './EstimateProcessing';
import {goBack} from '@app/utils/UNavigation';
import useNavBeforeRemove from '@app/hooks/useNavBeforeRemove';
import {
  IGetListOfEstimationsPayload,
  IRPGetListEstimation,
} from '@app/definitions/TApi';
import houseEstimation from '@app/api/houseEstimation';
import {defaultFlatListProps, LIMIT, MAX_PRICE_MKP} from '@app/constants/keys';
import useGetList from '@app/hooks/useGetList';
import {showFailMessage} from '@app/utils/UMessage';
import mNumber from '@app/utils/methods/mNumber';
import IcInformation from '@app/assets/svg/IcInformation';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';
import FooterFlatList from '@app/components/atoms/FooterFlatList';
import RefreshControl from '@app/components/atoms/RefreshControl';
import EstimateRating, {IEstimateRatingItem} from './components/EstimateRating';
import debounce from 'lodash/debounce';

const HouseDetail: React.FC<IHouseDetailScreenProps> = ({route}) => {
  const {houseDetail, isInput, listItem, houseId} = route.params;
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const [estimatedPrice, setEstimatedPrice] = useState(
    mNumber.formatBidValue(String(houseDetail?.price)) ?? '',
  );
  const [feedback, setFeedback] = useState(houseDetail?.feedback ?? '');
  const [rating, setRating] = useState<IEstimateRatingItem[]>(
    houseDetail?.ratings ?? [],
  );
  const [isForceQuit, setIsForceQuit] = useState(!isInput);

  const {data, onRefresh, isLoadMore, onLoadMore} = useGetList<
    IGetListOfEstimationsPayload,
    IRPGetListEstimation
  >(
    houseEstimation.getListOfEstimations,
    {
      limit: LIMIT,
      listingId: houseId,
      sortByPrice: '-1',
    },
    {isTrigger: listItem ?? false},
  );

  const amountError =
    Number(mNumber.removeStartZero(mNumber.removeComma(estimatedPrice) ?? '')) >
    MAX_PRICE_MKP;
  const btnDisable =
    !estimatedPrice ||
    !feedback ||
    !rating.every(e => e.rate !== 0) ||
    amountError ||
    estimatedPrice === '0';

  useNavBeforeRemove(isForceQuit);

  const onFinish = () => {
    closeGlobalModal();
    goBack();
  };
  const onEstimate = () => {
    if (houseId) {
      houseEstimation
        .estimate({
          listingId: houseId,
          ratings: rating,
          feedback: feedback,
          price: Number(mNumber.removeComma(estimatedPrice)),
        })
        .then(() => {
          openGlobalModal({
            containerStyle: styles.modal,
            content: (
              <EstimateProcessing
                onFinish={onFinish}
                screenType={'SuccessEstimation'}
                showBack
              />
            ),
          });
        })
        .catch(err => {
          closeGlobalModal();
          showFailMessage(String(err));
        });
    }
  };
  const onOpenProcess = () => {
    InteractionManager.runAfterInteractions(onBackdropPress).then(() => {
      setIsForceQuit(true);
      openGlobalModal({
        containerStyle: styles.modal,
        content: <EstimateProcessing screenType={'Process'} showBack={false} />,
      });
    });
    debounce(onEstimate, 1000)();
  };
  const onConfirm = () => {
    openAlertModal({
      icon: <IcInformation style={styles.modalIcon} />,
      title: i18n.t('common.Confirm'),
      desc: i18n.t('RealEstateDetail.AreYouSureToConfirmThisEstimate'),
      modalProps: {
        onBackdropPress: onBackdropPress,
      },
      leftButtonType: 'bordered',
      rightButtonType: 'success',
      leftButtonTitle: i18n.t('common.Cancel'),
      rightButtonTitle: i18n.t('common.Confirm'),
      titleStyle: [styles.titleModal, {color: colors.transferTitle}],
      descStyle: [styles.descModal, {color: colors.searchIcon}],
      buttons: {
        onRightAction: onOpenProcess,
      },
    });
  };
  const onBackdropPress = () => closeAlertModal();
  const onChangePrice = (text: string) => {
    setEstimatedPrice(mNumber.formatBidValue(text));
    setIsForceQuit(false);
  };
  const onChangeFeedback = (text: string) => {
    setFeedback(text.trimStart());
    setIsForceQuit(false);
  };

  const $userName = StyleSheet.flatten([
    styles.userName,
    {color: colors.chipText},
  ]);
  const $input72 = StyleSheet.flatten([styles.$input, styles.padding72]);
  const $title = StyleSheet.flatten([
    styles.title,
    {color: colors.titleHouseDetail},
  ]);
  const $desc = StyleSheet.flatten([
    styles.desc,
    {color: colors.descHouseDetail},
  ]);
  const $scrollItem = StyleSheet.flatten([
    styles.scrollItem,
    {backgroundColor: colors.mainBackground},
  ]);

  const ItemDetail = ({detailItem}: {detailItem: IRPGetListEstimation}) => {
    const $itemDetail = StyleSheet.flatten([
      styles.scrollItem,
      {
        backgroundColor:
          user?._id === detailItem.userId
            ? colors.primaryBackground
            : colors.mainBackground,
      },
    ]);
    return (
      <View style={$itemDetail}>
        <RowContainer style={styles.avatarContainerDetail}>
          <AutoImage uri={detailItem.image} style={styles.avatarDetail} />
          <Separator width={ratioW(16)} />
          <Text style={[$userName, styles.userNameList]}>
            {detailItem?.name ?? ''}
          </Text>
        </RowContainer>
        <View style={styles.titleDescContainer}>
          <Text style={$title}>
            {i18n.t('RealEstateDetail.HouseDetail.EstimatedPrice')}
          </Text>
          <Text style={$desc}>
            {mNumber.formatUsaCurrency(detailItem.price)}
          </Text>
        </View>
      </View>
    );
  };
  const renderMain = () => {
    if (isInput) {
      return (
        <FlexView style={$scrollItem}>
          <ScrollView>
            <View style={styles.avatarContainer}>
              <AutoImage uri={houseDetail.image} style={styles.avatar} />
              <Text style={$userName}>{houseDetail?.name ?? ''}</Text>
            </View>
            <AmountInput
              unit="$"
              value={estimatedPrice}
              containerStyles={styles.$input}
              onChangeText={onChangePrice}
              label={mText.addRequired(
                i18n.t('RealEstateDetail.HouseDetail.EstimatedPrice'),
              )}
              isError={amountError}
              errorText={i18n.t(
                'RealEstateDetail.EstimatedPriceMustBeLowerThan',
              )}
              enableLeft
            />
            <TextInput
              value={feedback}
              onChangeText={onChangeFeedback}
              label={mText.addRequired(
                i18n.t('RealEstateDetail.HouseDetail.Feedback'),
              )}
              contentStyles={$input72}
              maxLength={99}
            />
            <Text style={$title}>
              {mText.addRequired(i18n.t('RealEstateDetail.Estimate.Rating'))}
            </Text>
            <View style={styles.marginLeft24}>
              {rating.map(item => {
                const onChangeRating = (numberRating: number) => {
                  let tmp = [...rating];
                  tmp = tmp.map(e => {
                    if (e.key === item.key) {
                      e.rate = numberRating;
                      return e;
                    }
                    return e;
                  });
                  setRating(tmp);
                  setIsForceQuit(false);
                };
                return (
                  <EstimateRating
                    key={item.key}
                    item={item}
                    onChangeRating={onChangeRating}
                    isReadonly={false}
                    isOwner={false}
                  />
                );
              })}
            </View>
            <Button
              title={i18n.t('common.Confirm')}
              onPress={onConfirm}
              style={styles.buttonConfirm}
              disabled={btnDisable}
            />
          </ScrollView>
        </FlexView>
      );
    } else {
      return <ItemDetail detailItem={houseDetail} />;
    }
  };
  const renderItem: ListRenderItem<IRPGetListEstimation> = ({item, index}) => {
    return <ItemDetail detailItem={item} key={index} />;
  };

  return (
    <FlexView>
      <Header title="" />
      {listItem ? (
        <FlatList
          {...defaultFlatListProps}
          style={styles.$scroll}
          contentContainerStyle={styles.flexGrow}
          data={data}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          refreshControl={<RefreshControl onRefresh={onRefresh} />}
          ListFooterComponent={<FooterFlatList isLoadMore={isLoadMore} />}
        />
      ) : (
        <ScrollView
          style={styles.$scroll}
          contentContainerStyle={styles.flexGrow}>
          {renderMain()}
        </ScrollView>
      )}
    </FlexView>
  );
};

export default HouseDetail;

const styles = StyleSheet.create({
  $input: {
    marginBottom: ratioW(24),
  },
  $scroll: {
    flex: 1,
  },
  avatar: {
    width: ratioW(120),
    height: ratioW(120),
    borderRadius: ratioW(60),
    marginBottom: ratioW(20),
  },
  userName: {
    ...TPoppinsStyle.H2028Bold,
    fontSize: 22,
  },
  userNameList: {
    width: screenWidth * 0.77,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ratioW(24),
  },
  avatarDetail: {
    width: ratioW(60),
    height: ratioW(60),
    borderRadius: ratioW(30),
  },
  avatarContainerDetail: {
    alignItems: 'center',
    marginBottom: ratioW(16),
  },
  padding72: {
    paddingBottom: ratioW(72),
  },
  flexGrow: {flexGrow: 1},
  title: {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
  },
  desc: {
    ...TPoppinsStyle.H1624Regular,
  },
  titleDescContainer: {
    marginBottom: ratioW(20),
  },
  modal: {alignItems: 'stretch', flex: 1},
  scrollItem: {
    paddingHorizontal: ratioW(16),
    paddingTop: ratioW(16),
    marginTop: ratioW(8),
  },
  buttonConfirm: {
    marginVertical: ratioW(12),
    marginBottom: Platform.OS === 'ios' ? ratioW(40) : ratioW(20),
  },
  modalIcon: {
    alignSelf: 'center',
  },
  titleModal: {
    ...TPoppinsStyle.H2228Medium,
  },
  descModal: {
    ...TPoppinsStyle.H1624Regular,
  },
  marginLeft24: {marginLeft: ratioW(24)},
  marginLeft8: {marginLeft: ratioW(8)},
});
