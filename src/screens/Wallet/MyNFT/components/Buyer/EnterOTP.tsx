import React, {useEffect, useState} from 'react';
import {ScrollView, TextStyle, ViewStyle} from 'react-native';
import {Button, Text, VerifyCode} from '@app/components/atoms';
import {Header} from '@app/components/atoms/Header';
import {FlexView} from '@app/components/organism';
import i18n from '@app/i18n';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {IEnterOTPScreenProps} from '@app/stacks/types/TNoFooterStack';
import {useTheme} from '@app/theme';
import userManagement from '@app/api/userManagement';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import {showFailMessage} from '@app/utils/UMessage';
import {useCountdown} from '@app/hooks/useCountdown';
import {IRPOTPFailed} from '@app/definitions/TApi';

const numberOfCodes = 5;
const EnterOTP: React.FC<IEnterOTPScreenProps> = ({route}) => {
  const {onButtonPress} = route.params;
  const {colors} = useTheme();
  const [listOfCodes, setListOfCodes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [invalidTime, setInvalidTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFailed, setShowFailed] = useState(false);
  const {minutes, seconds} = useCountdown(new Date(timeLeft));
  const convertMin = minutes > 0 ? `${minutes}m` : '0m';
  const convertSec = seconds > 0 ? `${seconds}s` : '0s';

  useEffect(() => {
    openLoading();
    userManagement
      .sendOtp()
      .then(() => closeLoading())
      .catch((err: IRPOTPFailed) => {
        closeLoading();
        if (err.data) {
          showFailMessage(String(err.message));
        } else {
          showFailMessage(String(err));
        }
      });
  }, []);

  useEffect(() => {
    if (minutes < 0 && seconds < 0) {
      setShowFailed(false);
      setInvalidTime(0);
    } else {
      setShowFailed(true);
    }
  }, [minutes, seconds]);

  const codeString = listOfCodes.slice(0, numberOfCodes).join('');
  const disabled = codeString.length !== 5 || showFailed;

  const $subTitle: TextStyle = {
    marginBottom: ratioW(24),
    ...TPoppinsStyle.H2028Bold,
  };
  const $container: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };
  const $mainContainer: ViewStyle = {
    margin: ratioW(16),
    marginBottom: ratioW(24),
    flexGrow: 1,
  };
  const $errorText: TextStyle = {
    color: colors.cancelColor,
    ...TPoppinsStyle.H1216Regular,
  };
  const onContinue = () => {
    openLoading();
    userManagement
      .verifyOtp(codeString)
      .then(() => {
        closeLoading();
        onButtonPress();
      })
      .catch((err: IRPOTPFailed) => {
        closeLoading();
        if (err.data) {
          setMessage(err.message);
          setInvalidTime(err.data.invalidPhoneCodeTime);
          setTimeLeft(err.data.blockPhoneTime);
        } else {
          showFailMessage(String(err));
        }
      });
  };

  return (
    <FlexView style={$container}>
      <Header title={i18n.t('common.Transfer')} />
      <ScrollView contentContainerStyle={$mainContainer}>
        <FlexView>
          <Text style={$subTitle}>{i18n.t('Wallet.WeJustSendYouAnOTP')}</Text>
          <VerifyCode
            numberOfCodes={numberOfCodes}
            value={listOfCodes}
            onchange={setListOfCodes}
          />
          {(!!invalidTime || showFailed) && (
            <Text style={$errorText}>
              {message} {showFailed && `(${convertMin}:${convertSec})`}
            </Text>
          )}
        </FlexView>
        <Button
          disabled={disabled}
          onPress={onContinue}
          title={i18n.t('common.Continue')}
        />
      </ScrollView>
    </FlexView>
  );
};

export default EnterOTP;
