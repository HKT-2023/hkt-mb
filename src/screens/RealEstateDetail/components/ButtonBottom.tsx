import React from 'react';
import {ratioW} from '@app/utils/UDimension';
import Button from '@app/components/atoms/Button/Button';
import {StyleSheet, ViewStyle} from 'react-native';
import {Separator} from '@app/components/atoms';
import {RowContainer} from '@app/components/organism';
import {useTheme} from '@app/theme';
import i18n from '@app/i18n';
import {TUserRole} from '@app/definitions/TUser';
import {TButtonVoid} from '@app/definitions/TButton';

interface IButtonBottom {
  onContact: TButtonVoid;
  onRequestTour: TButtonVoid;
  onEstimate: TButtonVoid;
  onCheckin: TButtonVoid;
  role: TUserRole;
  isCheckIn: boolean;
  isEstimation: boolean;
  isAgentAssigned: boolean;
  isForSaleAndActive: boolean;
}
const ButtonBottom: React.FC<IButtonBottom> = ({
  onContact,
  onRequestTour,
  onEstimate,
  onCheckin,
  role,
  isCheckIn,
  isEstimation,
  isAgentAssigned,
  isForSaleAndActive,
}) => {
  const {colors} = useTheme();

  const $buttonContainer = StyleSheet.flatten([
    styles.rowOffer,
    {backgroundColor: colors.headerBackground},
  ]);

  const $button: ViewStyle = {
    ...styles.button,
    backgroundColor: colors.mainBackground,
  };

  const renderButton = () => {
    switch (role) {
      case 'RealifiAgent':
        if (isForSaleAndActive) {
          if (isCheckIn) {
            if (!isEstimation) {
              return (
                <RowContainer style={$buttonContainer}>
                  <Button
                    title={i18n.t('RealEstateDetail.Buttons.Estimate')}
                    style={styles.button}
                    onPress={onEstimate}
                  />
                </RowContainer>
              );
            } else {
              return <React.Fragment />;
            }
          } else {
            return (
              <RowContainer style={$buttonContainer}>
                <Button
                  title={i18n.t('RealEstateDetail.Buttons.CheckInToEstimate')}
                  style={styles.button}
                  onPress={onCheckin}
                />
              </RowContainer>
            );
          }
        } else {
          return <React.Fragment />;
        }
      case 'User':
        return (
          <RowContainer style={$buttonContainer}>
            <Button
              title={i18n.t('RealEstateDetail.Buttons.RequestTour')}
              buttonType={'bordered'}
              style={$button}
              onPress={onRequestTour}
            />
            {isAgentAssigned && (
              <>
                <Separator width={ratioW(16)} />
                <Button
                  title={i18n.t('RealEstateDetail.Buttons.ContactAgent')}
                  style={styles.button}
                  onPress={onContact}
                />
              </>
            )}
          </RowContainer>
        );
      case 'NonRealiFiAgent':
        return <React.Fragment />;
      default:
        return <React.Fragment />;
    }
  };

  return renderButton();
};

export default ButtonBottom;

const styles = StyleSheet.create({
  requestNFT: {
    marginTop: ratioW(12),
  },
  button: {
    flexGrow: 1,
    width: undefined,
    paddingVertical: ratioW(12),
  },
  rowOffer: {
    padding: ratioW(12),
    borderTopLeftRadius: ratioW(24),
    borderTopRightRadius: ratioW(24),
  },
  iconLeft: {
    marginRight: ratioW(8),
  },
});
