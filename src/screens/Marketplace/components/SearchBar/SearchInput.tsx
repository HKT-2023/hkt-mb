import React from 'react';
import i18n from '@app/i18n';
import {
  ratioW,
  TextInput,
  TButtonAny,
  ITextInputProps,
} from 'react-native-gin-boilerplate';
import {IcLocationPin, IcPinFill} from '@app/assets/svg';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

interface ISearchInput {
  isShowUserLocation: boolean;
  isFocusUser?: boolean;
  setIsFocusUser?: TButtonAny<boolean>;
}
const SearchInput: React.FC<ISearchInput & ITextInputProps> = props => {
  const $locationBtn: ViewStyle = {
    padding: ratioW(8),
    borderRadius: ratioW(8),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ratioW(4),
    flex: 1,
  };
  const $container: ViewStyle = {justifyContent: 'center'};

  const onPress = () => {
    props.setIsFocusUser?.(true);
  };

  return (
    <View style={$container}>
      <TextInput
        placeholder={i18n.t('Marketplace.SearchHomes')}
        returnKeyLabel={i18n.t('common.Search')}
        returnKeyType="search"
        maxLength={254}
        {...props}
      />
      {props.isShowUserLocation && (
        <TouchableOpacity
          style={$locationBtn}
          onPress={onPress}
          activeOpacity={0.8}>
          {props.isFocusUser ? <IcPinFill /> : <IcLocationPin />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
