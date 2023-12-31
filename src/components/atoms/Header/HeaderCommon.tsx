import styles from './styles';
import React, {ReactElement} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ColorValue,
  TouchableOpacity,
} from 'react-native';
import {IcArrowLeft} from '@app/assets/svg';
import UNavigation from '@app/utils/UNavigation';
import {
  Text,
  ratioW,
  useTheme,
  RowContainer,
} from 'react-native-gin-boilerplate';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface IHeaderProps {
  title: string;
  onGoBack?(): void;
  isShowBack?: boolean;
  titleStyle?: TextStyle;
  backIconColor?: ColorValue;
  iconRight?: ReactElement;
  containerStyle?: ViewStyle;
}

const Header: React.FC<IHeaderProps> = props => {
  const {
    title,
    onGoBack,
    iconRight,
    titleStyle,
    backIconColor = 'white',
    containerStyle,
    isShowBack = true,
  } = props;
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const DEFAULT_CONFIG = {
    width: ratioW(20),
    height: ratioW(20),
    color: colors.headerTintColor,
  };

  const sContainer: ViewStyle = {
    paddingTop: top,
    ...styles.container,
    backgroundColor: colors.headerBackground,
    ...containerStyle,
  };

  const $title: TextStyle = {
    ...styles.title,
    color: colors.headerTitleColor,
    textAlign: isShowBack ? 'left' : 'center',
    flex: 1,
  };

  const renderRight = () => {
    return <RowContainer>{iconRight}</RowContainer>;
  };

  return (
    <View style={sContainer}>
      <RowContainer style={styles.headerNormal}>
        {(isShowBack && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onGoBack ?? UNavigation.goBack}>
            <IcArrowLeft color={backIconColor} />
          </TouchableOpacity>
        )) || <View style={DEFAULT_CONFIG} />}
        <Text style={[$title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {(iconRight && renderRight()) || <View style={DEFAULT_CONFIG} />}
      </RowContainer>
    </View>
  );
};

export default React.memo(Header);
