import dNFTSortBy from '@app/_dummy/dNFTSortBy';
import React from 'react';
import {
  FlatList,
  ViewStyle,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import i18n from '@app/i18n';
import {keyExtractor} from '@app/constants/keys';
import {INFTSortBy} from '@app/definitions/TFilter';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {
  Text,
  ratioW,
  FlexView,
  useTheme,
  TButtonAny,
  TButtonVoid,
  RowContainer,
  SelectionButton,
} from 'react-native-gin-boilerplate';
import {IcClose} from '@app/assets/svg';

interface IProps {
  value: INFTSortBy | null;
  onChangeValue?: TButtonAny<INFTSortBy>;
  onCancel?: TButtonVoid;
}

const NFTSortBy: React.FC<IProps> = ({value, onChangeValue, onCancel}) => {
  const {colors} = useTheme();
  const renderItem: ListRenderItem<INFTSortBy> = ({item}) => {
    const onPress = () => {
      onChangeValue?.(item);
    };

    return (
      <SelectionButton
        isBorder
        type="radio"
        onPress={onPress}
        title={item.value}
        isCheck={value?.key === item.key}
      />
    );
  };

  const $headerWrapper: ViewStyle = {
    ...styles.headerWrapper,
    borderBottomColor: colors.borderColor,
  };

  return (
    <FlexView>
      <RowContainer style={$headerWrapper}>
        <Text style={styles.title}>{i18n.t('common.SortBy')}</Text>
        <TouchableOpacity onPress={onCancel}>
          <IcClose width={ratioW(30)} height={ratioW(30)} />
        </TouchableOpacity>
      </RowContainer>
      <FlatList
        data={dNFTSortBy}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </FlexView>
  );
};

export default React.memo(NFTSortBy);

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: ratioW(16),
    paddingHorizontal: ratioW(20),
  },
  title: {
    ...TPoppinsStyle.H1624Bold,
    flex: 1,
  },
});
