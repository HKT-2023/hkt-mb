import i18n from '@app/i18n';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import mText from '@app/utils/methods/mText';
import mNumber from '@app/utils/methods/mNumber';
import mWrapper from '@app/utils/methods/mWrapper';
import {Header} from '@app/components/atoms/Header';
import Button from '@app/components/atoms/Button/Button';
import {Textarea, TextInput} from '@app/components/atoms';
import {FlexView, ScrollView} from '@app/components/organism';
import useNavBeforeRemove from '@app/hooks/useNavBeforeRemove';
import {IContactAgentScreenProps} from '@app/stacks/types/TNoFooterStack';
import contactAgentManagement from '@app/api/contactAgentManagement';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import {showFailMessage, showSuccessMessage} from '@app/utils/UMessage';

const ContactAgent: React.FC<IContactAgentScreenProps> = ({
  navigation,
  route,
}) => {
  const {listingId, location} = route.params;
  const [isChanged, setIsChanged] = useState<boolean>(true);
  useNavBeforeRemove(isChanged);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formChanged, setFormChanged] = useState({
    nameChanged: false,
    emailChanged: false,
    phoneChanged: false,
    messageChanged: false,
  });

  const wrapperFuncOnChanged = (key: keyof typeof formChanged) => {
    setIsChanged(false);
    setFormChanged({...formChanged, [key]: true});
  };

  const onConfirm = async () => {
    openLoading();
    setIsChanged(true);
    await contactAgentManagement
      .contactAgent({
        listingId,
        location,
        ...form,
      })
      .then(res => {
        closeLoading();
        showSuccessMessage(res.message);
        navigation.goBack();
      })
      .catch(error => {
        showFailMessage(String(error));
        closeLoading();
      });
  };

  const onChangName = (name: string) => {
    wrapperFuncOnChanged('nameChanged');
    setForm({...form, name: name});
  };

  const onChangEmail = (email: string) => {
    wrapperFuncOnChanged('emailChanged');
    mWrapper.onChangeByKey('email', email, form, setForm);
  };

  const onChangPhoneNumber = (phoneNumber: string) => {
    wrapperFuncOnChanged('phoneChanged');
    mWrapper.onChangeByKey(
      'phone',
      mNumber.removeAllExceptNumber(phoneNumber),
      form,
      setForm,
    );
  };

  const onChangMessage = (message: string) => {
    wrapperFuncOnChanged('messageChanged');
    setForm({...form, message: message});
  };

  const disabled =
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.message ||
    !!mText.emailValidator(form.email);

  return (
    <FlexView>
      <Header title={i18n.t('Marketplace.ContactAgent')} />
      <ScrollView style={styles.$scroll}>
        <TextInput
          value={form.name}
          onChangeText={onChangName}
          containerStyles={styles.$input}
          isError={formChanged.nameChanged && !form.name}
          label={mText.addRequired(i18n.t('common.Name'))}
          errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
        />
        <TextInput
          value={form.email}
          autoCapitalize="none"
          onChangeText={onChangEmail}
          containerStyles={styles.$input}
          errorText={mText.emailValidator(form.email)}
          label={mText.addRequired(i18n.t('common.Email'))}
          isError={
            formChanged.emailChanged && !!mText.emailValidator(form.email)
          }
        />
        <TextInput
          maxLength={15}
          autoCapitalize="none"
          value={form.phone}
          keyboardType="number-pad"
          containerStyles={styles.$input}
          onChangeText={onChangPhoneNumber}
          isError={formChanged.phoneChanged && !form.phone}
          label={mText.addRequired(i18n.t('common.PhoneNumber'))}
          errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
        />
        <Textarea
          maxLength={1000}
          value={form.message}
          onChangeText={onChangMessage}
          containerStyles={styles.$input}
          label={mText.addRequired(i18n.t('common.Message'))}
          isError={formChanged.messageChanged && !form.message}
          errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
        />
        <Button
          title={i18n.t('common.Confirm')}
          onPress={onConfirm}
          disabled={disabled}
        />
      </ScrollView>
    </FlexView>
  );
};

export default ContactAgent;

const styles = StyleSheet.create({
  $input: {
    marginBottom: ratioW(25),
  },
  $scroll: {
    marginTop: ratioW(8),
  },
});
