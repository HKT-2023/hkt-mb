import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IcClose from '@app/assets/svg/IcClose';
import {useTheme} from '@app/theme';
import {ratioW} from '@app/utils/UDimension';
import {closeBottomSheet} from '@app/components/molecules/Modal/function';
import {AutoImage, Button, Text} from '@app/components/atoms';
import {TButtonVoid} from '@app/definitions/TButton';
import {RowContainer, ViewCondition} from '@app/components/organism';
import {TPoppinsStyle} from '@app/utils/UTextStyle';
import i18n from '@app/i18n';
import {HBA, REALTokenImg} from '@app/assets/photos';
import {Source} from 'react-native-fast-image';
import mNumber from '@app/utils/methods/mNumber';
import nftManagement from '@app/api/nftManagement';
import {showFailMessage} from '@app/utils/UMessage';

interface IConfirmBuyModal {
  modalTitle: string;
  buttonTitle: string;
  buttonPress: TButtonVoid;
  isShowTotalRoyalty: boolean;
  itemName: string;
  total: string;
}

const ConfirmBuyModal: React.FC<IConfirmBuyModal> = props => {
  const {colors} = useTheme();
  const [gasFee, setGasFee] = useState(0);
  const [royalty, setRoyalty] = useState(0);

  useEffect(() => {
    nftManagement
      .estimateFee()
      .then(res => {
        if (res.data) {
          setGasFee(res.data?.gasFee);
          setRoyalty(
            (Number(mNumber.removeComma(props.total)) / 100) *
              res.data?.royaltyPercentage,
          );
        }
      })
      .catch(err => showFailMessage(err));
  }, []);

  const $container = StyleSheet.flatten([
    styles.container,
    {backgroundColor: colors.mainBackground},
  ]);
  const $borderBottom = StyleSheet.flatten([
    styles.borderBottom,
    {borderBottomColor: colors.separatorBackground},
  ]);
  const $btnContainer = StyleSheet.flatten([
    styles.btnContainer,
    {
      backgroundColor: colors.headerBackground,
      borderColor: colors.separatorBackground,
    },
  ]);
  const $modalTitle = StyleSheet.flatten([
    styles.modalTitle,
    {color: colors.transferTitle},
  ]);
  const $rowTable = StyleSheet.flatten([
    styles.rowTable,
    {borderBottomColor: colors.borderSearchMarket},
  ]);
  const $rowTitle = StyleSheet.flatten([
    styles.rowTitle,
    {color: colors.realestateTableTitle},
  ]);
  const $rowDesc = StyleSheet.flatten([styles.rowDesc, {color: colors.date}]);

  const onPress = () => {
    closeBottomSheet();
    props?.buttonPress();
  };
  const onClose = () => {
    closeBottomSheet();
  };

  const RowItem = ({
    hasLeftIcon,
    title,
    desc,
    source,
  }: {
    hasLeftIcon: boolean;
    title: string;
    desc: string;
    source?: Source;
  }) => {
    const renderIcon = () => {
      return (
        <>
          {source ? (
            <AutoImage source={source} style={styles.icon} />
          ) : (
            <View style={styles.icon} />
          )}
        </>
      );
    };
    return (
      <RowContainer style={$rowTable}>
        <Text style={$rowTitle}>{title}</Text>
        {hasLeftIcon ? (
          <RowContainer style={styles.itemCenter}>
            {renderIcon()}
            <Text style={$rowDesc}>{desc}</Text>
          </RowContainer>
        ) : (
          <View style={styles.itemCenter}>
            <Text style={$rowDesc}>{desc}</Text>
          </View>
        )}
      </RowContainer>
    );
  };

  return (
    <View style={$container}>
      <RowContainer style={styles.headerContainer}>
        <Text style={$modalTitle}>{props.modalTitle}</Text>
        <TouchableOpacity onPress={onClose}>
          <IcClose />
        </TouchableOpacity>
      </RowContainer>
      <View style={$borderBottom} />
      <ScrollView>
        <RowItem
          title={i18n.t('common.Item')}
          desc={props.itemName}
          hasLeftIcon={false}
        />
        <ViewCondition isVisible={props.isShowTotalRoyalty}>
          <RowItem
            title={i18n.t('Wallet.Total')}
            desc={mNumber.formatNumberWithDots(
              String(Number(mNumber.removeComma(props?.total) ?? 0).toFixed(2)),
            )}
            hasLeftIcon={true}
            source={REALTokenImg}
          />
        </ViewCondition>
        <RowItem
          title={i18n.t('NFTDetail.GasFee')}
          desc={mNumber.formatNumberWithDots(String(gasFee.toFixed(2)))}
          hasLeftIcon={true}
          source={HBA}
        />
        <ViewCondition isVisible={props.isShowTotalRoyalty}>
          <RowItem
            title={i18n.t('Wallet.RoyaltyApplyForSeller')}
            desc={mNumber.formatNumberWithDots(String(royalty.toFixed(2)))}
            hasLeftIcon={true}
            source={REALTokenImg}
          />
        </ViewCondition>
      </ScrollView>
      <View style={$btnContainer}>
        <Button
          title={props.buttonTitle}
          style={styles.button}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default ConfirmBuyModal;

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: ratioW(20),
    borderTopStartRadius: ratioW(20),
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
    margin: ratioW(16),
    alignItems: 'center',
  },
  borderBottom: {borderBottomWidth: ratioW(1)},
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: ratioW(12),
    borderWidth: ratioW(1),
    paddingBottom: Platform.OS === 'ios' ? ratioW(40) : ratioW(20),
  },
  button: {
    flexGrow: 1,
    width: undefined,
    paddingVertical: ratioW(12),
  },
  modalTitle: {
    ...TPoppinsStyle.H1624Medium,
  },
  icon: {
    height: ratioW(24),
    width: ratioW(24),
    marginRight: ratioW(8),
  },
  rowTable: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ratioW(16),
    borderBottomWidth: 1,
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowTitle: {
    ...TPoppinsStyle.H1420Regular,
    flex: 1,
  },
  rowDesc: {
    ...TPoppinsStyle.H1420Medium,
    textAlign: 'right',
  },
});
