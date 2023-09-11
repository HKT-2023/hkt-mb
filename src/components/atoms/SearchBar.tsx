import React from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {
  ratioW,
  useTheme,
  RowContainer,
  fontSizeText,
  ITextInputProps,
} from 'react-native-gin-boilerplate';
import {IcLoup} from '@app/assets/svg';

interface ISearchBarProps extends ITextInputProps {
  wrapperStyles?: ViewStyle;
  position?: 'left' | 'right';
  iconSize?: number;
  iconRight?: JSX.Element;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  iconSize = 24,
  position = 'left',
  wrapperStyles,
  iconRight,
  ...props
}) => {
  const {colors} = useTheme();

  const $inputWrapper: ViewStyle = {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#C3CBCD',
    borderRadius: ratioW(8),
    paddingHorizontal: ratioW(8),
    backgroundColor: colors.mainBackground,
    ...wrapperStyles,
  };

  return (
    <RowContainer style={$inputWrapper}>
      {position === 'left' && (
        <IcLoup
          color={colors.defaultText}
          width={ratioW(iconSize)}
          height={ratioW(iconSize)}
        />
      )}
      <TextInput
        style={styles.input}
        selectionColor={colors.primaryColor}
        placeholderTextColor={colors.menuText}
        {...props}
      />
      {position === 'right' &&
        (iconRight ?? (
          <IcLoup
            color={colors.defaultText}
            width={ratioW(iconSize)}
            height={ratioW(iconSize)}
          />
        ))}
    </RowContainer>
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: ratioW(45),
    marginLeft: ratioW(8),
    fontSize: fontSizeText(15),
  },
});
