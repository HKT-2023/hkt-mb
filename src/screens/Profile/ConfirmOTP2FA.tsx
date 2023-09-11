import React, {useEffect, useState} from 'react';
import i18n from '@app/i18n';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import {VerifyCode} from '@app/components/atoms';
import {IRPOTPFailed} from '@app/definitions/TApi';
import {ScrollView} from '@app/components/organism';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import userManagement from '@app/api/userManagement';
import {useCountdown} from '@app/hooks/useCountdown';
import {TReduxState} from '@app/redux/store/configureStore';
import {IConfirmOTP2FAScreenProps} from '@app/stacks/types/TNoFooterStack';
import {
  Text,
  Button,
  ratioW,
  useTheme,
  FlexView,
  UMessage,
  openLoading,
  closeLoading,
  withKeyboardAvoidingView,
} from 'react-native-gin-boilerplate';
import {HeaderCommon} from '@app/components/atoms/Header';

const numberOfCodes = 5;
const ConfirmOTP2FA: React.FC<IConfirmOTP2FAScreenProps> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {phone} = route.params;
  const [listOfCodes, setListOfCodes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [invalidTime, setInvalidTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFailed, setShowFailed] = useState(false);
  const {minutes, seconds} = useCountdown(new Date(timeLeft));
  const convertMin = minutes > 0 ? `${minutes}m` : '0m';
  const convertSec = seconds > 0 ? `${seconds}s` : '0s';

  const codeString = listOfCodes.slice(0, numberOfCodes).join('');

  const onContinue = () => {
    openLoading();
    userManagement
      .validatePhoneCode({phone: phone, code: codeString})
      .then(() => {
        closeLoading();
        Dispatch.getUserInfor();
        navigation.navigate('VERIFICATION_SUCCESS_SCREEN', {});
      })
      .catch((err: IRPOTPFailed) => {
        closeLoading();
        if (user) {
          Dispatch.getUserInforSuccess({...user, isVerifyPhone: false});
        }
        if (err.data) {
          setMessage(err.message);
          setInvalidTime(err.data.invalidPhoneCodeTime);
          setTimeLeft(err.data.blockPhoneTime);
        } else {
          UMessage.showFailMessage(String(err));
        }
      });
  };

  useEffect(() => {
    if (minutes < 0 && seconds < 0) {
      setShowFailed(false);
      setInvalidTime(0);
    } else {
      setShowFailed(true);
    }
  }, [minutes, seconds]);

  const disabled = codeString.length !== 5 || showFailed;

  const $errorText = StyleSheet.flatten([styles.errorText, {color: '#B81E45'}]);

  return (
    <FlexView>
      <HeaderCommon title={i18n.t('common.Transfer')} />
      <ScrollView
        contentContainerStyle={styles.$container}
        style={styles.$content}>
        <FlexView>
          <Text style={styles.$subTitle}>
            {i18n.t('UserProfile.WeJustSentYouAVerificationCode')}
          </Text>
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

export default withKeyboardAvoidingView(ConfirmOTP2FA);

const styles = StyleSheet.create({
  $subTitle: {
    marginBottom: ratioW(24),
    ...TPoppinsStyle.H2028Bold,
  },
  $container: {
    flexGrow: 1,
  },
  $content: {
    marginTop: ratioW(8),
  },
  errorText: {
    ...TPoppinsStyle.H1216Regular,
  },
});
