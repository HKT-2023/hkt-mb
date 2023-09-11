import FastImage from 'react-native-fast-image';
import IcStar from '@app/assets/svg/IcStar';
import React from 'react';
import sharedStyles from '@app/styles/sharedStyles';
import {ICoach} from '@app/definitions/TCoach';
import {ratioW} from '@app/utils/UDimension';
import {RowContainer} from '@app/components/organism';
import {StyleSheet, View} from 'react-native';
import {Text} from '@app/components/atoms';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';

interface IProps {
  item: ICoach;
  index?: number;
}

const ItemCoach: React.FC<IProps> = ({item}) => {
  const rates = new Array(5).fill({});
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.content, {backgroundColor: colors.itemBackground}]}>
        <FastImage source={item.photo as number} style={styles.photo} />
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <RowContainer style={styles.starWrapper}>
          {rates.map((_, index) => {
            return <IcStar key={index} />;
          })}
        </RowContainer>
        <Text style={styles.bio} numberOfLines={5}>
          {item.bio}
        </Text>
      </View>
    </View>
  );
};

export default ItemCoach;

const styles = StyleSheet.create({
  starWrapper: {
    marginVertical: ratioW(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...TPoppinsStyle.H1420Bold,
    textAlign: 'center',
  },
  bio: {
    ...TPoppinsStyle.H1216Medium,
    textAlign: 'center',
    color: '#9ab2b5',
    flex: 1,
  },
  photo: {
    width: ratioW(40),
    height: ratioW(40),
    alignSelf: 'center',
    marginBottom: ratioW(10),
    borderRadius: ratioW(20),
  },
  container: {
    width: '50%',
    padding: ratioW(10),
  },
  content: {
    flex: 1,
    borderRadius: ratioW(24),
    height: ratioW(220),
    padding: ratioW(20),
    backgroundColor: 'white',
    ...sharedStyles.shadow,
  },
});
