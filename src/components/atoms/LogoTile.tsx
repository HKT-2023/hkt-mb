import React from 'react';
import {StyleSheet} from 'react-native';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {
  ratioW,
  RowContainer,
  Text,
  useTheme,
} from 'react-native-gin-boilerplate';

interface IProps {
  color?: string;
  size?: number;
}

const LogoTile: React.FC<IProps> = ({color}) => {
  const {colors} = useTheme();
  return (
    <RowContainer>
      <Text style={[styles.appName, {color: color ?? colors.mainBackground}]}>
        Real Estate Marketplace
      </Text>
    </RowContainer>
  );
};

export default React.memo(LogoTile);

const styles = StyleSheet.create({
  appName: {
    ...TPoppinsStyle.H2028Regular,
    marginLeft: ratioW(8),
    letterSpacing: 2.5,
  },
});
