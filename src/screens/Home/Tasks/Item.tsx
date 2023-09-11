import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ITask} from '@app/definitions/TTask';
import {Separator, Text} from '@app/components/atoms';
import {ratioW} from '@app/utils/UDimension';
import sharedStyles from '@app/styles/sharedStyles';
import {FlexView, RowContainer} from '@app/components/organism';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {useTheme} from '@app/theme';
import IcCheck from '@app/assets/svg/IcCheck';
import IcNonCheck from '@app/assets/svg/IcNonCheck';

interface IProps {
  item: ITask;
}

const Item: React.FC<IProps> = ({item}) => {
  const {colors} = useTheme();
  const [isDone, setIsDone] = useState(item.isDone);

  const onCheckTask = () => setIsDone(!isDone);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onCheckTask}>
      <RowContainer
        style={[styles.container, {backgroundColor: colors.itemBackground}]}>
        <FlexView>
          <Text style={styles.time}>{item.time}</Text>
          <Separator height={ratioW(10)} />
          <Text style={[styles.content, {color: colors.inactiveColor}]}>
            {item.content}
          </Text>
        </FlexView>
        {(isDone && <IcCheck style={styles.icon} />) || (
          <IcNonCheck style={styles.icon} />
        )}
      </RowContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  time: {
    ...TPoppinsStyle.H1624Medium,
  },
  content: {
    ...TPoppinsStyle.H1420Regular,
  },
  container: {
    paddingVertical: ratioW(14),
    paddingHorizontal: ratioW(10),
    ...sharedStyles.shadow,
    marginBottom: ratioW(10),
    borderRadius: ratioW(16),
  },
});

export default Item;
