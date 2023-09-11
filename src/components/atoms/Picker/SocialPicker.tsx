import React from 'react';
import {
  ratioW,
  useTheme,
  withPopup,
  RowContainer,
  IWithPopUpBase,
} from 'react-native-gin-boilerplate';
import {
  IcArrowDown,
  IcFacebook,
  IcInstagram,
  IcLinkedIn,
  IcTiktok,
} from '@app/assets/svg';
import {TSocial} from '@app/definitions/TUser';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

const SocialPicker: React.FC<IWithPopUpBase> = props => {
  const {colors} = useTheme();

  const $row: StyleProp<ViewStyle> = {
    borderWidth: 1,
    alignItems: 'center',
    marginRight: ratioW(8),
    borderRadius: ratioW(4),
    paddingStart: ratioW(16),
    paddingVertical: ratioW(14),
    paddingHorizontal: ratioW(4),
    borderColor: colors.inputInactiveBorder,
  };

  const $arrow: StyleProp<ViewStyle> = {
    marginLeft: ratioW(4),
  };

  const onPress = () => {
    props?.onShow?.();
  };

  const renderIcon = () => {
    switch (props.values?.[0].id as TSocial) {
      case 'facebook':
        return <IcFacebook />;
      case 'instagram':
        return <IcInstagram />;
      case 'linkedIn':
        return <IcLinkedIn />;
      case 'tiktok':
        return <IcTiktok />;
      default:
        return <IcFacebook />;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <RowContainer style={$row}>
        {renderIcon()}
        <IcArrowDown style={$arrow} />
      </RowContainer>
    </TouchableOpacity>
  );
};

export default withPopup<IWithPopUpBase>(SocialPicker);
