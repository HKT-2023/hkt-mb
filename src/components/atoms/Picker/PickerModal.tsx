import ReactNativeModal from 'react-native-modal';
import {Animated, StyleSheet} from 'react-native';
import mAnimated from '@app/utils/methods/mAnimated';
import {ratioW, TButtonVoid} from 'react-native-gin-boilerplate';
import React, {PropsWithChildren, useEffect, useRef} from 'react';

interface IPickerModalProps extends PropsWithChildren {
  isVisible: boolean;
  onclose?: TButtonVoid;
}

const PickerModal: React.FC<IPickerModalProps> = ({
  isVisible,
  onclose,
  ...props
}) => {
  const animatedRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      mAnimated.changeAnimated({
        value: animatedRef.current,
        toValue: 1,
      });
    } else {
      mAnimated.changeAnimated({
        value: animatedRef.current,
        toValue: 0,
        duration: 150,
      });
    }
  }, [isVisible]);

  const sView = StyleSheet.flatten([
    {transform: [{scale: animatedRef.current}], flex: 1},
  ]);

  return (
    <ReactNativeModal
      style={styles.modal}
      animationIn="zoomIn"
      isVisible={isVisible}
      animationOut="fadeOut"
      backdropOpacity={0.1}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackdropPress={onclose}>
      <Animated.View style={sView} pointerEvents="box-none">
        {props.children}
      </Animated.View>
    </ReactNativeModal>
  );
};

export default PickerModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginHorizontal: ratioW(16),
  },
});
