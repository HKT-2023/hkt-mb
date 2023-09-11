import i18n from '@app/i18n';
import React, {useCallback, useState} from 'react';
import {
  EventArg,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {TNavigation} from '@app/stacks/types/TStack';
import {InteractionManager, StyleSheet} from 'react-native';
import {openAlertModal, useTheme} from 'react-native-gin-boilerplate';
import {IcWarning} from '@app/assets/svg';

const useNavBeforeRemove = (forceQuit = false) => {
  const [isQuit, setIsQuit] = useState(false);
  const navigation = useNavigation<TNavigation>();
  const {colors} = useTheme();

  const onCancel = () => setIsQuit(false);

  const onConfirmBeforeQuit = (
    e: EventArg<
      'beforeRemove',
      true,
      {
        action: Readonly<{
          type: string;
          payload?: object;
          source?: string;
          target?: string;
        }>;
      }
    >,
  ) => {
    if (!forceQuit) {
      e.preventDefault();
      openAlertModal({
        title: i18n.t('common.Alert'),
        desc: i18n.t('common.AreUSureWantToQuit'),
        icon: <IcWarning style={styles.icon} />,
        rightButtonTitle: i18n.t('common.Confirm'),
        leftButtonTitle: i18n.t('common.Cancel'),
        leftButtonType: 'bordered',
        rightButtonType: 'success',
        leftButtonProps: {
          mainColor: colors.dangerColor,
        },
        rightButtonProps: {
          mainColor: colors.dangerColor,
        },
        buttons: {
          onLeftAction: onCancel,
          onRightAction: () => {
            InteractionManager.runAfterInteractions(() => setIsQuit(true)).then(
              () => {
                navigation.dispatch(e.data.action);
              },
            );
          },
        },
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.addListener('beforeRemove', onConfirmBeforeQuit);
      return () =>
        navigation.removeListener('beforeRemove', onConfirmBeforeQuit);
    }, [navigation, forceQuit]),
  );

  return {isQuit};
};

export default useNavBeforeRemove;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
});
