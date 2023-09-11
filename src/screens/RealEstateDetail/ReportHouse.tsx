import React, {useState} from 'react';
import {FlexView, ScrollView} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import i18n from '@app/i18n';
import {Textarea, TextInput} from '@app/components/atoms';
import {StyleSheet} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import Button from '@app/components/atoms/Button/Button';
import {IReportHouseScreenProps} from '@app/stacks/types/TNoFooterStack';
import reportListing from '@app/api/reportListing';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import {showFailMessage, showSuccessMessage} from '@app/utils/UMessage';
import {goBack} from '@app/utils/UNavigation';
import mNumber from '@app/utils/methods/mNumber';
import mText from '@app/utils/methods/mText';

const ReportHouse: React.FC<IReportHouseScreenProps> = ({route}) => {
  const {listingId, location} = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const btnDisable =
    !name ||
    !email ||
    !phoneNumber ||
    !reason ||
    !!mText.emailValidator(email, false);

  const onConfirm = () => {
    openLoading();
    reportListing
      .reportListing({
        email: email,
        listingId: listingId,
        location: location,
        name: name,
        phone: phoneNumber,
        reason: reason,
      })
      .then(res => {
        closeLoading();
        showSuccessMessage(res.message);
        goBack();
      })
      .catch(err => {
        closeLoading();
        showFailMessage(String(err));
      });
  };
  const onChangePhone = (inputPhone: string) => {
    setPhoneNumber(mNumber.removeAllExceptNumber(inputPhone));
  };
  const onChangeName = (inputName: string) => {
    setName(inputName.trimStart());
  };
  const onChangeEmail = (inputEmail: string) => {
    setEmail(inputEmail.trimStart());
  };
  const onChangeReason = (inputReason: string) => {
    setReason(inputReason.trimStart());
  };

  return (
    <FlexView>
      <Header title={i18n.t('Marketplace.ReportAProblem')} />
      <ScrollView style={styles.$scroll}>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          label={mText.addRequired(i18n.t('common.Name'))}
          containerStyles={styles.$input}
        />
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          label={mText.addRequired(i18n.t('common.Email'))}
          containerStyles={styles.$input}
          errorText={mText.emailValidator(email)}
          isError={!!mText.emailValidator(email, false)}
          multiline={true}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={onChangePhone}
          label={mText.addRequired(i18n.t('common.PhoneNumber'))}
          containerStyles={styles.$input}
          keyboardType={'number-pad'}
          maxLength={15}
        />
        <Textarea
          value={reason}
          onChangeText={onChangeReason}
          label={mText.addRequired(i18n.t('common.Details'))}
          containerStyles={styles.$input}
          textInputStyles={styles.textInputTextStyle}
        />
        <Button
          title={i18n.t('common.Confirm')}
          onPress={onConfirm}
          disabled={btnDisable}
        />
      </ScrollView>
    </FlexView>
  );
};

export default ReportHouse;

const styles = StyleSheet.create({
  $input: {
    marginBottom: ratioW(25),
  },
  $scroll: {
    marginTop: ratioW(8),
  },
  textInputTextStyle: {paddingBottom: 72},
});
