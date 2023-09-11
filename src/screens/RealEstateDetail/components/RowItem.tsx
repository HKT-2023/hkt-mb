import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Separator, Text} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {TPoppinsStyle} from '@app/utils/UTextStyle';

interface IRowItem {
  title: string;
  desc: string;
  leftIcon?: JSX.Element;
}

const RowItem: React.FC<IRowItem> = ({title, desc, leftIcon}) => {
  const {colors} = useTheme();

  const tableRowText = StyleSheet.flatten([
    styles.rowView,
    {
      borderBottomColor: colors.borderColor,
    },
  ]);

  const tableRowTextTitle = StyleSheet.flatten([
    styles.tableTitle,
    {
      color: colors.realestateTableTitle,
    },
  ]);

  const tableRowTextContent = StyleSheet.flatten([
    styles.tableContent,
    {
      color: colors.date,
    },
  ]);
  const $rowItemContainer = StyleSheet.flatten([
    tableRowText,
    styles.justifyBetween,
  ]);

  return (
    <RowContainer style={$rowItemContainer}>
      <RowContainer style={styles.rowTitleIcon}>
        {leftIcon}
        {leftIcon && <Separator width={ratioW(8)} />}
        <Text style={tableRowTextTitle}>{title}</Text>
      </RowContainer>
      <View style={styles.rowDesc}>
        <Text style={tableRowTextContent}>{desc}</Text>
      </View>
    </RowContainer>
  );
};

export default RowItem;

const styles = StyleSheet.create({
  justifyBetween: {
    justifyContent: 'space-between',
  },
  rowView: {
    borderBottomWidth: ratioW(1),
    paddingVertical: ratioW(12),
  },
  tableTitle: {
    ...TPoppinsStyle.H1420Regular,
  },

  tableContent: {
    ...TPoppinsStyle.H1420Medium,
    textAlign: 'right',
  },
  rowTitleIcon: {width: '40%', alignItems: 'center'},
  rowDesc: {width: '50%', alignItems: 'flex-end'},
});
