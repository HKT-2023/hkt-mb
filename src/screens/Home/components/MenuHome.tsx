import React from 'react';
import {IMenuHome} from '@app/definitions/TMenuHome';
import {ratioW} from '@app/utils/UDimension';
import {Separator, Text} from '@app/components/atoms';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {TButtonVoid} from '@app/definitions/TButton';

interface IProps {
  item: IMenuHome;
  index: number;
  onPress?: TButtonVoid;
}

const MenuHome: React.FC<IProps> = ({item, index, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          paddingLeft: index % 2 !== 0 ? ratioW(20) : 0,
          paddingRight: index % 2 === 0 ? ratioW(20) : 0,
          alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start',
        },
      ]}>
      <View style={styles.content}>
        {item.icon}
        <Separator height={ratioW(10)} />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuHome;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...TPoppinsStyle.H1420Medium,
  },
  container: {
    width: '50%',
    paddingVertical: ratioW(20),
  },
  content: {
    width: '80%',
    height: ratioW(140),
    alignItems: 'center',
    borderRadius: ratioW(16),
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: ratioW(30),
    paddingHorizontal: ratioW(20),
  },
});
