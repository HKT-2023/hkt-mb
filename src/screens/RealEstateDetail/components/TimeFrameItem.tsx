import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IcTick from '@app/assets/svg/RealEstateDetail/IcTick';
import IcUntick from '@app/assets/svg/RealEstateDetail/IcUntick';
import {Separator, Text} from '@app/components/atoms';
import {TButtonAny} from '@app/definitions/TButton';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {RowContainer} from '@app/components/organism';
import mDate from '@app/utils/methods/mDate';

interface ITimeFrameItem {
  title: string;
  timeFrame: string;
  setTimeFrame: TButtonAny<string>;
  type: string;
  dateSelected: string;
}
const TimeFrameItem: React.FC<ITimeFrameItem> = ({
  title,
  timeFrame,
  setTimeFrame,
  type,
  dateSelected,
}) => {
  const [disable, setDisable] = useState(false);
  const currentDate = mDate.getCurrent();
  const currentHour = mDate.getCurrentHour();

  const onPress = () => setTimeFrame(title);

  useEffect(() => {
    if (!dateSelected) {
      setDisable(true);
    } else {
      if (
        new Date(mDate.convertDateToStandard(dateSelected)).getTime() ===
        new Date(mDate.convertDateToStandard(currentDate)).getTime()
      ) {
        switch (type) {
          case 'morning':
            setDisable(true);
            break;
          case 'afternoon':
            if (Number(currentHour) < 12) {
              setDisable(false);
            } else {
              setDisable(true);
            }
            break;
          case 'evening':
            if (Number(currentHour) < 18) {
              setDisable(false);
            } else {
              setDisable(true);
            }
            break;
          default:
            setDisable(false);
        }
      } else {
        setDisable(false);
      }
    }
  }, [dateSelected]);

  const $content = StyleSheet.flatten([
    styles.alignCenter,
    {opacity: disable ? 0.3 : 1},
  ]);

  return (
    <TouchableOpacity
      style={styles.timeFrameItem}
      activeOpacity={disable ? 1 : 0}
      onPress={disable ? undefined : onPress}>
      <RowContainer style={$content}>
        {title === timeFrame ? <IcTick /> : <IcUntick />}
        <Separator width={ratioW(16)} />
        <Text style={styles.timeFrameItemTitle}>{title}</Text>
      </RowContainer>
    </TouchableOpacity>
  );
};

export default TimeFrameItem;

const styles = StyleSheet.create({
  timeFrameItem: {
    marginVertical: ratioW(16),
  },
  timeFrameItemTitle: {
    ...TPoppinsStyle.H1624Regular,
  },
  alignCenter: {alignItems: 'center'},
});
