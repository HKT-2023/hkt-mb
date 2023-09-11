import {
  Keyboard,
  TextStyle,
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import React from 'react';
import {
  Text,
  ratioW,
  useTheme,
  TButtonAny,
  RowContainer,
} from 'react-native-gin-boilerplate';

export interface IVerifyCode {
  value: string[];
  numberOfCodes: number;
  onchange: TButtonAny<string[]>;
}

const VerifyCode: React.FC<IVerifyCode> = ({
  numberOfCodes = 1,
  value,
  onchange,
}) => {
  const {colors} = useTheme();
  const inputCodes = new Array(numberOfCodes).fill({});

  const generateRefs = (): React.RefObject<TextInput>[] => {
    const tmp: React.RefObject<TextInput>[] = [];
    inputCodes.forEach(() => tmp.push(React.createRef<TextInput>()));
    return tmp;
  };

  const refs = generateRefs();

  const textInputProps: TextInputProps = {
    numberOfLines: 1,
    keyboardType: 'number-pad',
    selectionColor: colors.primaryColor,
  };

  const $code: TextStyle = {
    flex: 1,
    fontSize: 25,
    borderWidth: 1,
    height: ratioW(50),
    fontWeight: 'bold',
    color: '#425862',
    textAlign: 'center',
    borderRadius: ratioW(10),
    borderColor: '#425862',
  };

  const $separatorText: TextStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primaryColor,
    textAlignVertical: 'center',
    marginHorizontal: ratioW(10),
  };

  const onTextChange = (t: string, i: number) => {
    const tmp = [...value];
    tmp[i] = t;
    if (t.length > 1) {
      onchange(t.split(''));
    } else {
      onchange(tmp);
    }
    if (t.length >= numberOfCodes) {
      refs[numberOfCodes - 1].current?.focus();
    } else if (t.length > 1) {
      refs[t.length].current?.focus();
    } else {
      if (t) {
        if (i < numberOfCodes - 1) {
          refs[i + 1].current?.focus();
        } else {
          Keyboard.dismiss();
        }
      }
    }
  };

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !value[i] && i !== 0) {
      refs[i - 1].current?.focus();
    }
  };

  return (
    <RowContainer style={styles.$container}>
      {inputCodes.map((_, i) => {
        const _onTextChange = (t: string) => onTextChange(t, i);
        const _onKeyPress = (
          e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        ) => onKeyPress(e, i);

        const $text: TextStyle = {
          ...$separatorText,
          display: i < numberOfCodes - 1 ? 'flex' : 'none',
        };

        return (
          <React.Fragment key={i}>
            <TextInput
              allowFontScaling={false}
              ref={refs[i]}
              style={$code}
              value={value[i]}
              autoFocus={i === 0}
              {...textInputProps}
              onKeyPress={_onKeyPress}
              onChangeText={_onTextChange}
              maxLength={!value[i] || value[i]?.length < 1 ? 6 : 1}
            />
            <Text style={$text}>-</Text>
          </React.Fragment>
        );
      })}
    </RowContainer>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  $container: {
    marginBottom: ratioW(16),
    alignItems: 'center',
  },
});
