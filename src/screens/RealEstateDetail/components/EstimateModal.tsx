import React, {useState} from 'react';
import {
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IcClose from '@app/assets/svg/IcClose';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {closeBottomSheet} from '@app/components/molecules/Modal/function';
import {
  AmountInput,
  Button,
  Separator,
  Text,
  TextInput,
} from '@app/components/atoms';
import i18n from '@app/i18n';
import {navigate} from '@app/utils/UNavigation';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';
import {IRPGetListEstimation} from '@app/definitions/TApi';
import mNumber from '@app/utils/methods/mNumber';
import {MAX_PRICE_MKP} from '@app/constants/keys';
import mText from '@app/utils/methods/mText';
import EstimateRating, {IEstimateRatingItem} from './EstimateRating';
import {TPoppinsStyle} from '@app/utils/UTextStyle';

interface IEstimateModal {
  houseId: string;
}
const EstimateModal = ({houseId}: IEstimateModal) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);

  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<IEstimateRatingItem[]>([
    {
      key: 1,
      title: 'Natural lighting',
      rate: 0,
    },
    {
      key: 2,
      title: 'Noise',
      rate: 0,
    },
    {
      key: 3,
      title: 'Condition',
      rate: 0,
    },
    {
      key: 4,
      title: 'Floor Plan',
      rate: 0,
    },
    {
      key: 5,
      title: 'Outdoor Space',
      rate: 0,
    },
    {
      key: 6,
      title: 'Vibe',
      rate: 0,
    },
  ]);

  const amountError =
    Number(mNumber.removeStartZero(mNumber.removeComma(estimatedPrice) ?? '')) >
    MAX_PRICE_MKP;
  const btnDisable =
    !estimatedPrice ||
    !feedback ||
    !rating.every(e => e.rate !== 0) ||
    amountError ||
    estimatedPrice === '0';

  const onClose = () => {
    closeBottomSheet();
  };
  const onButtonPress = () => {
    const userName = () => {
      if (user?.typeOfUser === 'Vendor') {
        return user?.businessName ?? 'Unknown Name';
      } else {
        return `${user?.firstName ?? 'Unknown'} ${user?.lastName ?? 'Name'}`;
      }
    };
    const item: IRPGetListEstimation = {
      name: userName(),
      price: Number(mNumber.removeComma(estimatedPrice)),
      feedback: feedback,
      ratings: rating,
      image: user?.avatarUrl ?? '',
      userId: user?._id ?? '',
    };
    InteractionManager.runAfterInteractions(() => {
      onClose();
    }).then(() => {
      navigate('HOUSE_DETAIL_SCREEN', {
        isInput: true,
        houseDetail: item,
        houseId: houseId,
      });
    });
  };

  const $container = StyleSheet.flatten([
    styles.container,
    {backgroundColor: colors.mainBackground},
  ]);
  const $borderBottom = StyleSheet.flatten([
    styles.borderBottom,
    {borderBottomColor: colors.separatorBackground},
  ]);
  const $btnContainer = StyleSheet.flatten([
    styles.btnContainer,
    {
      backgroundColor: colors.headerBackground,
      borderColor: colors.separatorBackground,
    },
  ]);
  const $title = StyleSheet.flatten([
    styles.title,
    {color: colors.titleHouseDetail},
  ]);

  const onChangeFeedback = (inputFeedback: string) => {
    setFeedback(inputFeedback.trimStart());
  };

  return (
    <View style={$container}>
      <TouchableOpacity onPress={onClose} style={styles.headerContainer}>
        <IcClose />
      </TouchableOpacity>
      <View style={$borderBottom} />
      <ScrollView style={styles.scrollView}>
        <Separator height={ratioW(16)} />
        <AmountInput
          unit="$"
          value={estimatedPrice}
          containerStyles={styles.textInput}
          onChangeText={setEstimatedPrice}
          label={mText.addRequired(
            i18n.t('RealEstateDetail.HouseDetail.EstimatedPrice'),
          )}
          isError={amountError}
          errorText={i18n.t('RealEstateDetail.EstimatedPriceMustBeLowerThan')}
          enableLeft
        />
        <TextInput
          value={feedback}
          onChangeText={onChangeFeedback}
          containerStyles={styles.textInput}
          textInputStyles={styles.textInputTextStyle}
          label={mText.addRequired(
            i18n.t('RealEstateDetail.HouseDetail.Feedback'),
          )}
          maxLength={99}
        />
        <Text style={$title}>
          {mText.addRequired(i18n.t('RealEstateDetail.Estimate.Rating'))}
        </Text>
        <View style={styles.marginLeft8}>
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
      </ScrollView>
      <View style={$btnContainer}>
        <Button
          title={i18n.t('common.Submit')}
          style={styles.button}
          onPress={onButtonPress}
          disabled={btnDisable}
        />
      </View>
    </View>
  );
};

export default EstimateModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: ratioW(21),
    borderTopEndRadius: ratioW(20),
    borderTopStartRadius: ratioW(20),
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: ratioW(25),
    marginBottom: ratioW(21),
  },
  borderBottom: {borderBottomWidth: ratioW(1)},
  scrollView: {
    marginBottom: ratioW(70),
    marginHorizontal: ratioW(27),
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: ratioW(12),
    borderWidth: ratioW(1),
    paddingBottom: Platform.OS === 'ios' ? ratioW(40) : ratioW(20),
  },
  button: {
    flexGrow: 1,
    width: undefined,
    paddingVertical: ratioW(12),
  },
  textInput: {marginBottom: ratioW(20)},
  textInputTextStyle: {paddingBottom: 72},
  title: {
    ...TPoppinsStyle.H1420Medium,
    marginBottom: ratioW(4),
  },
  marginLeft8: {marginLeft: ratioW(8)},
});
