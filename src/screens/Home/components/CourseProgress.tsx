import React from 'react';
import sharedStyles from '@app/styles/sharedStyles';
import {StyleSheet, View} from 'react-native';
import {Text} from '@app/components/atoms';
import {ratioW} from '@app/utils/UDimension';
import {useTheme} from '@app/theme';
import {RowContainer} from '@app/components/organism';
import Button from '@app/components/atoms/Button/Button';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import ProgressBar from '@app/components/atoms/ProgressBar/ProgressBar';

const CourseProgress: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.itemBackground}]}>
      <RowContainer>
        <Text style={styles.title}>How to Write a Winning Offer</Text>
        <Button title="Continue" style={styles.continueBtn} />
      </RowContainer>
      <ProgressBar percent={23.4} />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  title: {
    ...TPoppinsStyle.H1624Medium,
    flex: 1,
    marginRight: ratioW(30),
  },
  container: {
    ...sharedStyles.shadow,
    borderRadius: ratioW(16),
    padding: ratioW(20),
    minHeight: ratioW(145),
    justifyContent: 'space-between',
  },
  continueBtn: {
    borderRadius: ratioW(16),
    paddingVertical: ratioW(14),
    paddingHorizontal: ratioW(15),
  },
});
