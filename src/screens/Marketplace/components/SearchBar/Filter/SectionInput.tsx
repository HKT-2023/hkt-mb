import i18n from '@app/i18n';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Dispatch from '@app/redux/Dispatch';
import SectionFilter from './SectionFilter';
import mNumber from '@app/utils/methods/mNumber';
import {IFilter} from '@app/definitions/TFilter';
import mWrapper from '@app/utils/methods/mWrapper';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TReduxState} from '@app/redux/store/configureStore';
import {
  ratioW,
  RowContainer,
  screenWidth,
  Separator,
  TButtonAny,
  TextInput,
  useTheme,
} from 'react-native-gin-boilerplate';

interface ISectionInput {
  data: IFilter[];
  onPress?: TButtonAny<boolean>;
}

const SectionInput: React.FC<ISectionInput> = ({data, onPress}) => {
  const {colors} = useTheme();
  const {dataInput} = useSelector(
    (state: TReduxState) => state.MKPFilterReducer,
  );
  const [isShow, setIsShow] = useState(false);

  const $headerTab = StyleSheet.flatten([
    styles.lineSeparator,
    {borderBottomColor: colors.borderColor},
  ]);

  const $body = StyleSheet.flatten([
    styles.flexWrap,
    isShow ? styles.displayFlex : styles.displayNone,
  ]);

  const $textInput = StyleSheet.flatten([
    styles.textInput,
    {borderColor: '#C8CFD7'},
  ]);

  const onToggle = (val: boolean) => {
    setIsShow(val);
    onPress?.(val);
  };

  return (
    <>
      <View style={$headerTab} />
      <SectionFilter
        title={i18n.t('Marketplace.Home.Filter.Amenity.Details')}
        onPress={onToggle}
      />
      <Separator height={ratioW(12)} />
      <RowContainer style={$body}>
        {data.map((item, index) => {
          const onChange = (text: string) => {
            mWrapper.onChangeByKey(
              item.value as keyof typeof dataInput,
              mNumber.removeAllDotButGetOne(text),
              dataInput,
              Dispatch.mkpSetDataInput,
              false,
            );
          };
          const $textInputContainer: ViewStyle = {
            width: screenWidth / 2,
            marginBottom: ratioW(16),
            paddingRight: ratioW(16),
            paddingLeft: index % 2 ? 0 : ratioW(16),
          };
          return (
            <TextInput
              key={index}
              label={item.title}
              onChangeText={onChange}
              clearTextOnFocus={false}
              contentStyles={$textInput}
              keyboardType={'decimal-pad'}
              containerStyles={$textInputContainer}
              value={dataInput[item.value as keyof typeof dataInput]}
            />
          );
        })}
      </RowContainer>
    </>
  );
};
export default SectionInput;

const styles = StyleSheet.create({
  lineSeparator: {
    borderBottomWidth: ratioW(1),
    marginVertical: ratioW(16),
    marginHorizontal: ratioW(16),
  },
  flexWrap: {flexWrap: 'wrap'},
  displayNone: {display: 'none'},
  displayFlex: {display: 'flex'},
  rotate180: {transform: [{rotate: '180deg'}]},
  textInput: {
    borderRadius: ratioW(4),
    flex: 1,
  },
  label: {...TPoppinsStyle.H1420Medium},
});
