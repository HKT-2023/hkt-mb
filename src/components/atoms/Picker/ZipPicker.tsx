import React from 'react';
import i18n from '@app/i18n';
import {
  withPopup,
  TextInput,
  IWithPopUpBase,
  ITextInputProps,
} from 'react-native-gin-boilerplate';

const ZipPicker: React.FC<ITextInputProps & IWithPopUpBase> = props => {
  return (
    <TextInput
      label={i18n.t('UserProfile.ZipCodeAndCity')}
      returnKeyLabel={i18n.t('common.Search')}
      onSubmitEditing={props?.onShow}
      returnKeyType="search"
      {...props}
    />
  );
};

export default withPopup(ZipPicker);
