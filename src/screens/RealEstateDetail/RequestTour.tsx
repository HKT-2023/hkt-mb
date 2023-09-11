import React, {useEffect, useState} from 'react';
import {IRequestTourScreenProps} from '@app/stacks/types/TNoFooterStack';
import {FlexView} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import i18n from '@app/i18n';
import {ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import Button from '@app/components/atoms/Button/Button';
import {useTheme} from '@app/theme';
import {Text} from '@app/components/atoms';
import mDate from '@app/utils/methods/mDate';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import TimeFrameItem from './components/TimeFrameItem';
import data from '@app/_dummy/request_tour_timeframe';
import {DatePicker} from '@app/components/atoms/Picker';
import requestTourManagement from '@app/api/requestTourManagement';
import {showFailMessage, showSuccessMessage} from '@app/utils/UMessage';
import {goBack} from '@app/utils/UNavigation';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';

const RequestTour: React.FC<IRequestTourScreenProps> = ({route}) => {
  const {listingId, location} = route.params;
  const {colors} = useTheme();
  const [dateSelected, setDateSelected] = useState(mDate.getCurrent());
  const [timeFrame, setTimeFrame] = useState<string>();

  const onConfirm = () => {
    openLoading();
    requestTourManagement
      .requestTour({
        day: dateSelected,
        listingId: listingId,
        location: location,
        timeFrame: timeFrame?.toLowerCase() ?? '',
      })
      .then(res => {
        closeLoading();
        goBack();
        showSuccessMessage(res.message);
      })
      .catch(err => {
        closeLoading();
        showFailMessage(String(err));
      });
  };
  const onChangeDate = (dt: Date | string) => {
    setDateSelected(mDate.formatDate(dt));
  };

  const minimumDate = () => {
    if (mDate.getCurrentHour() < 18) {
      return new Date();
    } else {
      return new Date(new Date().setDate(new Date().getDate() + 1));
    }
  };

  useEffect(() => {
    setDateSelected(mDate.formatDate(minimumDate()));
  }, []);

  const $scroll: ViewStyle = {
    flex: 1,
  };
  const $main = StyleSheet.flatten([
    styles.main,
    {backgroundColor: colors.mainBackground},
  ]);
  const $timeFrame = StyleSheet.flatten([
    styles.timeFrame,
    {color: colors.transferTitle},
  ]);

  return (
    <FlexView>
      <Header title={i18n.t('RealEstateDetail.Buttons.RequestTour')} />
      <ScrollView style={$scroll} contentContainerStyle={styles.flexGrow}>
        <FlexView style={$main}>
          <DatePicker
            onChange={onChangeDate}
            minimumDate={minimumDate()}
            pickerStyle={styles.$picker}
            value={mDate.convertDateToStandard(dateSelected)}
            isShowDelete={false}
            title={i18n.t('common.Date')}
          />
          <Text style={$timeFrame}>
            {i18n.t('RealEstateDetail.RequestTour.Time')}
          </Text>
          {data.map((item, key) => {
            return (
              <TimeFrameItem
                key={key}
                title={item.value}
                timeFrame={timeFrame ?? ''}
                setTimeFrame={setTimeFrame}
                type={item.key}
                dateSelected={dateSelected}
              />
            );
          })}
          <Button
            title={i18n.t('common.Confirm')}
            onPress={onConfirm}
            style={styles.btn}
          />
        </FlexView>
      </ScrollView>
    </FlexView>
  );
};

export default RequestTour;

const styles = StyleSheet.create({
  calendarWrapper: {
    width: ratioW(300),
    height: ratioW(360),
    alignItems: 'center',
  },
  timeFrame: {
    ...TPoppinsStyle.H1624Medium,
    marginBottom: ratioW(12),
  },
  textInput: {
    ...TPoppinsStyle.H1624Regular,
  },
  $picker: {
    marginBottom: ratioW(12),
  },
  main: {padding: ratioW(16), marginTop: ratioW(8)},
  flexGrow: {flexGrow: 1},
  btn: {position: 'absolute', bottom: ratioW(24), left: ratioW(16)},
});
