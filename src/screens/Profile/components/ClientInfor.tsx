import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import mDate from '@app/utils/methods/mDate';
import mText from '@app/utils/methods/mText';
import {StyleSheet, View} from 'react-native';
import mNumber from '@app/utils/methods/mNumber';
import mWrapper from '@app/utils/methods/mWrapper';
import {DatePicker} from '@app/components/atoms/Picker';
import {TReduxState} from '@app/redux/store/configureStore';
import {useDetailedUserInformationContext} from '@app/context';
import {ratioW, TextInput} from 'react-native-gin-boilerplate';

const ClientInfor: React.FC = () => {
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {userFields, onChangeUserFields} = useDetailedUserInformationContext();

  const onFirstNameChange = (fn: string) => {
    mWrapper.onChangeByKey(
      'firstName',
      fn?.trimStart(),
      userFields,
      onChangeUserFields,
      false,
    );
  };

  const onLastNameChange = (ln: string) => {
    mWrapper.onChangeByKey(
      'lastName',
      ln?.trimStart(),
      userFields,
      onChangeUserFields,
      false,
    );
  };

  const onPhoneChange = (pn: string) => {
    if (userFields?.phone === '+' || pn === '+') {
      mWrapper.onChangeByKey('phone', '', userFields, onChangeUserFields);
    } else {
      mWrapper.onChangeByKey(
        'phone',
        '+' + mNumber.removeAllExceptNumber(pn),
        userFields,
        onChangeUserFields,
      );
    }
  };

  const onChangeDate = (dt: Date | string) => {
    mWrapper.onChangeByKey(
      'dateOfBirth',
      mDate.formatDate(dt),
      userFields,
      onChangeUserFields,
    );
  };

  return (
    <View>
      <TextInput
        autoCapitalize="words"
        value={userFields?.firstName}
        containerStyles={styles.$input}
        isError={!userFields?.firstName}
        onChangeText={onFirstNameChange}
        label={mText.addRequired(i18n.t('common.FirstName'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <TextInput
        autoCapitalize="words"
        value={userFields?.lastName}
        containerStyles={styles.$input}
        isError={!userFields?.lastName}
        onChangeText={onLastNameChange}
        label={mText.addRequired(i18n.t('common.LastName'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <DatePicker
        onChange={onChangeDate}
        maximumDate={new Date()}
        pickerStyle={styles.$picker}
        value={
          userFields?.dateOfBirth
            ? mDate.convertDateToStandard(userFields?.dateOfBirth)
            : ''
        }
      />
      <TextInput
        editable={false}
        value={user?.email}
        containerStyles={styles.$input}
        label={mText.addRequired(i18n.t('common.Email'))}
      />
      <TextInput
        maxLength={15}
        value={userFields?.phone}
        keyboardType="number-pad"
        isError={!userFields?.phone}
        onChangeText={onPhoneChange}
        containerStyles={styles.$input}
        label={mText.addRequired(i18n.t('common.PhoneNumber'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
    </View>
  );
};

export default React.memo(ClientInfor);

const styles = StyleSheet.create({
  $input: {
    marginBottom: ratioW(20),
  },
  $picker: {
    marginBottom: ratioW(20),
  },
});
