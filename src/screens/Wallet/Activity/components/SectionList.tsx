import Item from '../../components/Item';
import React from 'react';
import {keyExtractor} from '@app/constants/keys';
import {ITransferSection} from '@app/definitions/TItem';
import SectionHeader from '../../components/SectionHeader';
import {
  ViewStyle,
  ListRenderItem,
  SectionListProps,
  SectionList as RNSectionList,
} from 'react-native';
import {IRPListActivity} from '@app/definitions/TApi';
import {
  FlexView,
  ratioW,
  Separator,
  useTheme,
} from 'react-native-gin-boilerplate';

interface IProps
  extends Partial<SectionListProps<IRPListActivity, ITransferSection>> {
  data: ITransferSection[];
}

const SectionList: React.FC<IProps> = ({data, ...props}) => {
  const {colors} = useTheme();

  const renderItem: ListRenderItem<IRPListActivity> = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  const $container: ViewStyle = {
    backgroundColor: colors.mainBackground,
  };

  const $content: ViewStyle = {
    paddingHorizontal: ratioW(16),
    backgroundColor: colors.mainBackground,
  };

  return (
    <FlexView style={$container}>
      <Separator
        width={'100%'}
        height={ratioW(8)}
        backgroundColor={'#E9F9FB'}
      />
      <RNSectionList
        {...props}
        sections={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={$content}
        renderSectionHeader={({section}) => (
          <SectionHeader title={section.title} />
        )}
      />
    </FlexView>
  );
};

export default React.memo(SectionList);
