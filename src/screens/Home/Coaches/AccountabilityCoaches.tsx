import React from 'react';
import {IAccountabilityCoachesScreenProps} from '@app/stacks/types/THomeStack';
import {FlatList, ListRenderItem} from 'react-native';
import {FlexView} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import {keyExtractor} from '@app/constants/keys';
import ItemCoach from './components/ItemCoach';
import {ICoach} from '@app/definitions/TCoach';
import Coaches from '@app/_dummy/Coaches';

const AccountabilityCoaches: React.FC<
  IAccountabilityCoachesScreenProps
> = () => {
  const renderItem: ListRenderItem<ICoach> = ({item}) => {
    return <ItemCoach item={item} />;
  };
  return (
    <FlexView>
      <Header title="Accountability Coaches" />
      <FlatList
        numColumns={2}
        data={Coaches}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </FlexView>
  );
};

export default AccountabilityCoaches;
