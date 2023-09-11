import React from 'react';
import i18n from '@app/i18n';
import {useSelector} from 'react-redux';
import mText from '@app/utils/methods/mText';
import {StyleSheet, View} from 'react-native';
import mWrapper from '@app/utils/methods/mWrapper';
import {TReduxState} from '@app/redux/store/configureStore';
import {useDetailedUserInformationContext} from '@app/context';
import {IItem} from '@app/components/atoms/Picker/ItemPickerOne';
import {
  DatePicker,
  Picker as VendorTypePicker,
} from '@app/components/atoms/Picker';
import {LIMIT} from '@app/constants/keys';
import mDate from '@app/utils/methods/mDate';
import useGetList from '@app/hooks/useGetList';
import mNumber from '@app/utils/methods/mNumber';
import vendorManagement from '@app/api/vendorManagement';
import {IRPVendorList, IRQVendorCategory} from '@app/definitions/TApi';
import {ratioW, Textarea, TextInput} from 'react-native-gin-boilerplate';

const VendorInfor: React.FC = () => {
  const {user} = useSelector((state: TReduxState) => state.UserReducer);
  const {vendorFields, onChangeVendorFields} =
    useDetailedUserInformationContext();
  const {
    data: vendorList,
    onLoadMore,
    meta,
  } = useGetList<IRQVendorCategory, IRPVendorList>(
    vendorManagement.vendorCategory,
    {limit: LIMIT * 100, status: 'Active'},
    {isShowLoading: false},
  );

  const vendorTypeList = vendorList.reduce((prev, curr) => {
    prev.push({id: curr._id, name: curr.name});
    return prev;
  }, [] as IItem[]);

  const getPickerValues = (): IItem[] => {
    const items: IItem[] = [];
    const arrayVendorTypes: string[] = vendorFields?.vendorType ?? [];
    arrayVendorTypes?.map(e => {
      const currentItem = vendorTypeList.find(v => v.id === e?.trim());
      items.push({id: e?.trim(), name: currentItem?.name ?? ''});
    });
    return items;
  };

  const listOfVendorTypes = getPickerValues();

  const onChangeNameOfBusiness = (fn: string) => {
    mWrapper.onChangeByKey(
      'businessName',
      fn?.trimStart(),
      vendorFields,
      onChangeVendorFields,
      false,
    );
  };

  const onChangePrimaryContact = (ln: string) => {
    mWrapper.onChangeByKey(
      'primaryContact',
      ln?.trimStart(),
      vendorFields,
      onChangeVendorFields,
      false,
    );
  };

  const onChangePhone = (pn: string) => {
    if (vendorFields?.phone === '+' || pn === '+') {
      mWrapper.onChangeByKey('phone', '', vendorFields, onChangeVendorFields);
    } else {
      mWrapper.onChangeByKey(
        'phone',
        '+' + mNumber.removeAllExceptNumber(pn),
        vendorFields,
        onChangeVendorFields,
      );
    }
  };

  const onChangeLicense = (ls: string) => {
    mWrapper.onChangeByKey('license', ls, vendorFields, onChangeVendorFields);
  };

  const onChangeVendorEmail = (ae: string) => {
    mWrapper.onChangeByKey(
      'vendorEmail',
      ae,
      vendorFields,
      onChangeVendorFields,
    );
  };

  const onChangeVendorLocation = (an: string) => {
    mWrapper.onChangeByKey(
      'vendorLocation',
      an?.trimStart(),
      vendorFields,
      onChangeVendorFields,
      false,
    );
  };

  const onChangeDescription = (des: string) => {
    mWrapper.onChangeByKey(
      'description',
      des,
      vendorFields,
      onChangeVendorFields,
      false,
    );
  };

  const onChangeVendorType = (vt: IItem) => {
    const isExisted = listOfVendorTypes.some(e => e.id === vt.id);
    let tmp = [...listOfVendorTypes];
    if (isExisted) {
      tmp = tmp.filter(l => l.id !== vt.id);
    } else {
      tmp.push(vt);
    }
    const m = tmp.reduce((p, c) => {
      p.push(c.id);
      return p;
    }, [] as string[]);
    if (vendorFields !== undefined) {
      onChangeVendorFields?.({...vendorFields, vendorType: m});
    }
  };

  const onDateChange = (dt: Date | string) => {
    mWrapper.onChangeByKey(
      'dateOfBirth',
      mDate.formatDate(dt),
      vendorFields,
      onChangeVendorFields,
    );
  };

  const getListNameVendorType = listOfVendorTypes.reduce((prev, curr) => {
    prev.push(curr.name);
    return prev;
  }, [] as string[]);

  return (
    <View>
      <TextInput
        autoCapitalize="words"
        containerStyles={styles.$input}
        value={vendorFields?.businessName}
        onChangeText={onChangeNameOfBusiness}
        isError={!vendorFields?.businessName}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
        label={mText.addRequired(i18n.t('UserProfile.NameOfBusiness'))}
      />
      <TextInput
        autoCapitalize="words"
        containerStyles={styles.$input}
        value={vendorFields?.primaryContact}
        onChangeText={onChangePrimaryContact}
        isError={!vendorFields?.primaryContact}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
        label={mText.addRequired(i18n.t('UserProfile.PrimaryContact'))}
      />
      <DatePicker
        onChange={onDateChange}
        maximumDate={new Date()}
        pickerStyle={styles.$picker}
        value={
          vendorFields?.dateOfBirth
            ? mDate.convertDateToStandard(vendorFields?.dateOfBirth)
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
        value={vendorFields?.phone}
        onChangeText={onChangePhone}
        isError={!vendorFields?.phone}
        containerStyles={styles.$input}
        label={mText.addRequired(i18n.t('common.PhoneNumber'))}
        errorText={i18n.t('Validate.TheRequiredFieldMustBeFilledIn')}
      />
      <TextInput
        maxLength={10}
        value={vendorFields?.license}
        onChangeText={onChangeLicense}
        containerStyles={styles.$input}
        label={i18n.t('common.License')}
      />
      <TextInput
        autoCapitalize="none"
        containerStyles={styles.$input}
        value={vendorFields?.vendorEmail}
        onChangeText={onChangeVendorEmail}
        label={i18n.t('UserProfile.VendorEmail')}
        isError={!!mText.emailValidator(vendorFields?.vendorEmail, false)}
        errorText={mText.emailValidator(vendorFields?.vendorEmail, false)}
      />
      <TextInput
        autoCapitalize="words"
        containerStyles={styles.$input}
        value={vendorFields?.vendorLocation}
        onChangeText={onChangeVendorLocation}
        label={i18n.t('UserProfile.VendorLocation')}
      />
      <VendorTypePicker
        isMultiple={true}
        data={vendorTypeList}
        style={styles.$picker}
        onLoadMore={onLoadMore}
        values={listOfVendorTypes}
        onchange={onChangeVendorType}
        value={getListNameVendorType.join(', ')}
        isLoadMore={meta.total > vendorTypeList.length}
        label={mText.addRequired(i18n.t('UserProfile.VendorType'))}
      />
      <Textarea
        containerStyles={styles.$input}
        value={vendorFields?.description}
        onChangeText={onChangeDescription}
        label={i18n.t('common.Description')}
      />
    </View>
  );
};

export default React.memo(VendorInfor);

const styles = StyleSheet.create({
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
