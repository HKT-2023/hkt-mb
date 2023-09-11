import i18n from '@app/i18n';
import React from 'react';
import styles from '../styles';
import {FlexView} from '@app/components/organism';
import {Text} from '@app/components/atoms';
import {useCountdown} from '@app/hooks/useCountdown';
import {View} from 'react-native';

interface IRemainingTime {
  timeLeft: string;
}

const RemainingTime: React.FC<IRemainingTime> = ({timeLeft}): JSX.Element => {
  const {days, hours, minutes} = useCountdown(timeLeft);

  const convertDay = days > 0 ? `${days}day ` : '';
  const convertHour = hours > 0 ? `${hours}h ` : '0h ';
  const convertMin = minutes > 0 ? `${minutes}m` : '0m';
  return (
    <FlexView>
      <Text style={styles.bidTimeTitle}>{i18n.t('common.Time')}</Text>
      <View style={styles.bidLeftButton}>
        <Text style={styles.bidTimeValue}>
          {convertDay}
          {convertHour}
          {convertMin}
        </Text>
      </View>
    </FlexView>
  );
};

export default React.memo(RemainingTime);
