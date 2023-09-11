import React from 'react';
import i18n from '@app/i18n';
import socials from '@app/_dummy/socials';
import {useSelector} from 'react-redux';
import mDate from '@app/utils/methods/mDate';
import mText from '@app/utils/methods/mText';
import {TSocial} from '@app/definitions/TUser';
import mNumber from '@app/utils/methods/mNumber';
import mWrapper from '@app/utils/methods/mWrapper';
import {validateEmail} from '@app/constants/regex';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TReduxState} from '@app/redux/store/configureStore';
import {useDetailedUserInformationContext} from '@app/context';
import {IItem} from '@app/components/atoms/Picker/ItemPickerOne';
import {DatePicker, SocialPicker} from '@app/components/atoms/Picker';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {
  ratioW,
  RowContainer,
  Text,
  Textarea,
  TextInput,
  useTheme,
} from 'react-native-gin-boilerplate';
import {IcAddBox, IcTrash} from '@app/assets/svg';

interface ISocialItem {
  type: TSocial;
  link: string;
}

const AgentInfor: React.FC = () => {
  const {colors} = useTheme();
  const {agentFields, onChangeAgentFields} =
    useDetailedUserInformationContext();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const socialLinks = agentFields?.socialMedia ?? [
    {type: 'facebook', link: ''},
  ];
  const buttonDisabled = socialLinks.some(e => !e.link);

  const addBoxColor = buttonDisabled
    ? colors.inputInactiveBorder
    : colors.inputActiveBorder;

  const $socialPicker: StyleProp<ViewStyle> = {
    ...styles.$input,
    alignItems: 'center',
  };

  const $addMore: StyleProp<TextStyle> = {
    color: addBoxColor,
    letterSpacing: 0.15,
    marginLeft: ratioW(12),
    ...TPoppinsStyle.H1624Medium,
  };

  const $trashWrapper: ViewStyle = {
    borderLeftWidth: 1,
    padding: ratioW(14),
    alignItems: 'center',
    marginLeft: ratioW(16),
    paddingHorizontal: ratioW(12),
    borderLeftColor: colors.inputInactiveBorder,
  };

  const onChangeSocial = (sl: ISocialItem[]) => {
    if (agentFields !== undefined) {
      onChangeAgentFields?.({...agentFields, socialMedia: sl});
    }
  };

  const onSocialsTextChange = (s: string, i: number) => {
    const tmp = [...socialLinks];
    tmp[i].link = s.trim();
    onChangeSocial(tmp);
  };

  const onPickerChange = (it: IItem, i: number) => {
    const tmp = [...socialLinks];
    tmp[i].type = it.id as TSocial;
    onChangeSocial(tmp);
  };

  const onAdd = () => {
    const socialTmp = [...socialLinks];
    socialTmp.push({type: 'facebook', link: ''});
    onChangeSocial(socialTmp);
  };

  const renderSocialLinks = () => {
    return (
      <React.Fragment>
        {socialLinks.map((e, i) => {
          const onRemoveItem = () => {
            const tmp = [...socialLinks];
            tmp.splice(i, 1);
            onChangeSocial(tmp);
          };

          return (
            <RowContainer style={$socialPicker} key={i}>
              <SocialPicker
                data={socials}
                values={[{id: e.type, name: ''}]}
                onchange={(item: IItem) => onPickerChange(item, i)}
              />
              <TextInput
                value={e.link}
                autoCapitalize="none"
                containerStyles={styles.$textarea}
                onChangeText={t => onSocialsTextChange(t, i)}
                label={mText.addRequired(i18n.t('UserProfile.SocialMedia'))}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={$trashWrapper}
                onPress={onRemoveItem}>
                <IcTrash />
              </TouchableOpacity>
            </RowContainer>
          );
        })}
      </React.Fragment>
    );
  };

  const onChangeFirstName = (fn: string) => {
    mWrapper.onChangeByKey(
      'firstName',
      fn?.trimStart(),
      agentFields,
      onChangeAgentFields,
      false,
    );
  };

  const onChangeLastName = (ln: string) => {
    mWrapper.onChangeByKey(
      'lastName',
      ln?.trimStart(),
      agentFields,
      onChangeAgentFields,
      false,
    );
  };

  const onChangePhone = (pn: string) => {
    if (agentFields?.phone === '+' || pn === '+') {
      mWrapper.onChangeByKey('phone', '', agentFields, onChangeAgentFields);
    } else {
      mWrapper.onChangeByKey(
        'phone',
        '+' + mNumber.removeAllExceptNumber(pn),
        agentFields,
        onChangeAgentFields,
      );
    }
  };

  const onChangeLicense = (ls: string) => {
    mWrapper.onChangeByKey('license', ls, agentFields, onChangeAgentFields);
  };

  const onChangeAgentEmail = (ae: string) => {
    mWrapper.onChangeByKey('agentEmail', ae, agentFields, onChangeAgentFields);
  };

  // const onChangeAgentName = (an: string) => {
  //   mWrapper.onChangeByKey(
  //     'agentName',
  //     an?.trimStart(),
  //     agentFields,
  //     onChangeAgentFields,
  //     false,
  //   );
  // };

  const onChangeDescription = (des: string) => {
    mWrapper.onChangeByKey(
      'description',
      des,
      agentFields,
      onChangeAgentFields,
      false,
    );
  };

  const onChangeDate = (dt: Date | string) => {
    mWrapper.onChangeByKey(
      'dateOfBirth',
      mDate.formatDate(dt),
      agentFields,
      onChangeAgentFields,
    );
  };

  const onValidateEmail = (): string => {
    if (!agentFields?.agentEmail) {
      return i18n.t('Validate.TheRequiredFieldMustBeFilledIn');
    } else {
      if (!validateEmail(agentFields?.agentEmail)) {
        return i18n.t('Authentication.InvalidEmailAddress');
      }
    }
    return '';
  };

  return (
    <View>
      <TextInput
        autoCapitalize="words"
        value={agentFields?.firstName}
        containerStyles={styles.$input}
        onChangeText={onChangeFirstName}
        isError={!agentFields?.firstName}
        label={mText.addRequired(i18n.t('common.FirstName'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <TextInput
        autoCapitalize="words"
        value={agentFields?.lastName}
        containerStyles={styles.$input}
        onChangeText={onChangeLastName}
        isError={!agentFields?.lastName}
        label={mText.addRequired(i18n.t('common.LastName'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <DatePicker
        onChange={onChangeDate}
        maximumDate={new Date()}
        pickerStyle={styles.$picker}
        value={
          agentFields?.dateOfBirth
            ? mDate.convertDateToStandard(agentFields?.dateOfBirth)
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
        keyboardType="number-pad"
        value={agentFields?.phone}
        onChangeText={onChangePhone}
        containerStyles={styles.$input}
        isError={!agentFields?.phone}
        label={mText.addRequired(i18n.t('common.PhoneNumber'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <TextInput
        maxLength={10}
        value={agentFields?.license}
        onChangeText={onChangeLicense}
        containerStyles={styles.$input}
        isError={!agentFields?.license}
        label={mText.addRequired(i18n.t('common.License'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <TextInput
        autoCapitalize="none"
        isError={!!onValidateEmail()}
        errorText={onValidateEmail()}
        containerStyles={styles.$input}
        value={agentFields?.agentEmail}
        onChangeText={onChangeAgentEmail}
        label={mText.addRequired(i18n.t('UserProfile.AgentEmail'))}
      />
      {/*<TextInput*/}
      {/*  autoCapitalize="words"*/}
      {/*  value={agentFields?.agentName}*/}
      {/*  containerStyles={styles.$input}*/}
      {/*  onChangeText={onChangeAgentName}*/}
      {/*  isError={!agentFields?.agentName}*/}
      {/*  label={mText.addRequired(i18n.t('UserProfile.AgentName'))}*/}
      {/*  errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}*/}
      {/*/>*/}
      {renderSocialLinks()}
      <TouchableOpacity
        onPress={onAdd}
        activeOpacity={0.8}
        disabled={buttonDisabled}
        style={styles.$addMoreSocial}>
        <IcAddBox color={addBoxColor} />
        <Text style={$addMore}>
          {socialLinks.length > 0
            ? i18n.t('UserProfile.AddMoreSocialMedia')
            : i18n.t('UserProfile.AddSocialMedia')}
        </Text>
      </TouchableOpacity>
      <Textarea
        maxLength={1000}
        containerStyles={styles.$input}
        value={agentFields?.description}
        onChangeText={onChangeDescription}
        label={i18n.t('common.Description')}
      />
    </View>
  );
};

export default AgentInfor;

const styles = StyleSheet.create({
  $addMoreSocial: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: ratioW(16),
    marginBottom: ratioW(16),
  },
  $textarea: {
    flex: 1,
  },
  $input: {
    marginBottom: ratioW(20),
  },
  $picker: {
    marginBottom: ratioW(20),
  },
});
