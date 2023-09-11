import FastImage from 'react-native-fast-image';
import IcThreeDot from '@app/assets/svg/IcThreeDot';
import React from 'react';
import sharedStyles from '@app/styles/sharedStyles';
import {FlexView, RowContainer} from '@app/components/organism';
import {IClientActivity} from '@app/definitions/TClientActivity';
import {ratioW, screenWidth} from '@app/utils/UDimension';
import {Separator, Text} from '@app/components/atoms';
import {StyleSheet, View} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';

interface IProps {
  item: IClientActivity;
}

const ItemClientActivity: React.FC<IProps> = ({item}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <RowContainer>
        <FlexView>
          <RowContainer>
            <FastImage
              source={item.photo as number}
              style={[styles.photo, {borderColor: colors.buttonColor}]}
            />
            <Separator width={ratioW(10)} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text
                style={[styles.lastActivity, {color: colors.inactiveColor}]}>
                {item.lastActivity}
              </Text>
            </View>
          </RowContainer>
        </FlexView>
        <IcThreeDot />
      </RowContainer>
      <Text style={styles.address}>{item.address}</Text>
    </View>
  );
};

export default ItemClientActivity;

const styles = StyleSheet.create({
  name: {
    ...TPoppinsStyle.H1420Medium,
  },
  lastActivity: {
    ...TPoppinsStyle.H1216Regular,
  },
  address: {
    ...TPoppinsStyle.H1420Regular,
    marginTop: ratioW(8),
  },
  photo: {
    width: ratioW(40),
    height: ratioW(40),
    borderWidth: 2,
    borderRadius: ratioW(20),
  },
  container: {
    ...sharedStyles.shadow,
    paddingLeft: ratioW(10),
    paddingRight: ratioW(20),
    paddingVertical: ratioW(20),
    width: screenWidth * 0.7,
    borderRadius: ratioW(16),
    marginBottom: ratioW(12),
    marginRight: ratioW(24),
    minHeight: ratioW(140),
  },
});
