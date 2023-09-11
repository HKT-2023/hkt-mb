import React from 'react';
import i18n from '@app/i18n';
import {
  Text,
  ratioW,
  useTheme,
  Separator,
  TButtonVoid,
  RowContainer,
  closeBottomSheet,
} from 'react-native-gin-boilerplate';
import mWrapper from '@app/utils/methods/mWrapper';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import {IcCamera, IcClose, IcPhoto} from '@app/assets/svg';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

const size = {
  width: ratioW(24),
  height: ratioW(24),
};

interface IProps {
  onLibraryChoose?: TButtonVoid;
  onCameraChoose?: TButtonVoid;
}

const ChangePhotoAction: React.FC<IProps> = ({
  onLibraryChoose,
  onCameraChoose,
}) => {
  const {colors} = useTheme();

  const $header: ViewStyle = {
    ...styles.header,
    borderBottomColor: colors.borderColor,
  };

  const _onLibraryChoose = () => {
    mWrapper.wCloseBottomSheetVoid(onLibraryChoose);
  };

  const _onCameraChoose = () => {
    mWrapper.wCloseBottomSheetVoid(onCameraChoose);
  };

  return (
    <View>
      <RowContainer style={$header}>
        <Text style={styles.title}>
          {i18n.t('UserProfile.ChangePhotoLogo')}
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <IcClose {...size} color={colors.defaultText} />
        </TouchableOpacity>
      </RowContainer>
      <RowContainer style={styles.mainRow}>
        <TouchableOpacity style={styles.itemWrapper} onPress={_onLibraryChoose}>
          <IcPhoto {...size} color={colors.defaultText} />
          <Text style={styles.label}>{i18n.t('common.Library')}</Text>
        </TouchableOpacity>
        <Separator
          height={'100%'}
          width={ratioW(1)}
          backgroundColor={colors.defaultText}
        />
        <TouchableOpacity style={styles.itemWrapper} onPress={_onCameraChoose}>
          <IcCamera {...size} color={colors.defaultText} />
          <Text style={styles.label}>{i18n.t('common.Camera')}</Text>
        </TouchableOpacity>
      </RowContainer>
    </View>
  );
};

export default React.memo(ChangePhotoAction);

const styles = StyleSheet.create({
  mainRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ratioW(28),
    paddingHorizontal: ratioW(16),
  },
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: ratioW(16),
  },
  label: {
    marginTop: ratioW(12),
    ...TPoppinsStyle.H1420Medium,
  },
  title: {
    ...TPoppinsStyle.H1624Medium,
    letterSpacing: 0.15,
  },
});
