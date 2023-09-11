import React, {useEffect, useState} from 'react';
import {IInterestedAreaScreenProps} from '@app/stacks/types/TNoFooterStack';
import {FlexView, RowContainer, ScrollView} from '@app/components/organism';
import {Header} from '@app/components/atoms/Header';
import i18n from '@app/i18n';
import Button from '@app/components/atoms/Button/Button';
import {StyleSheet, ViewStyle} from 'react-native';
import {ratioW} from '@app/utils/UDimension';
import {useTheme} from '@app/theme';
import {ZipPicker} from '@app/components/atoms/Picker';
import {
  IRPGetInterestAreaItem,
  IRPSearchLocationItem,
  IRQAddInterestAreaItem,
} from '@app/definitions/TApi';
import listing from '@app/api/listing';
import {showFailMessage, showSuccessMessage} from '@app/utils/UMessage';
import {IItem} from '@app/components/atoms/Picker/ItemPickerOne';
import {
  closeLoading,
  openLoading,
} from '@app/components/molecules/Loading/function';
import useSearchLocation from '@app/hooks/useSearchLocation';
import ChipItem from './components/ChipItem';
import {useSelector} from 'react-redux';
import {TReduxState} from '@app/redux/store/configureStore';

const formatNewInterest = (
  data: IItem[],
  oldData: IRPSearchLocationItem[],
): IRQAddInterestAreaItem[] => {
  const temp: IRQAddInterestAreaItem[] = [];
  data.forEach(item => {
    oldData.forEach(j => {
      if (item.id === j.id) {
        temp.push({
          center: j.center,
          aliasName: j.place_name,
          mapboxId: j.id,
          bbox: j.bbox,
          zipCode: j.zipCode,
          city: j.city,
        });
      }
    });
  });
  return temp;
};

const formatTempChip = (searchData: IRPSearchLocationItem[]) => {
  let _temp: IItem[] = [];
  _temp = searchData.map(e => {
    const name = () => {
      if (!e.zipCode) {
        return e.place_name;
      } else {
        if (!e.city) {
          return e.zipCode + ' - ' + e.place_name;
        } else {
          return e.zipCode + ' - ' + e.city;
        }
      }
    };
    return {
      id: e.id,
      name: name(),
    };
  });
  return _temp;
};

const InterestedArea: React.FC<IInterestedAreaScreenProps> = () => {
  const {colors} = useTheme();
  const {user} = useSelector((state: TReduxState) => state.UserReducer);

  const [zipCode, setZipCode] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [interestedAreas, setInterestedAreas] = useState<
    IRPGetInterestAreaItem[]
  >([]);
  const [newInterestedAreas, setNewInterestedAreas] = useState<
    IRPSearchLocationItem[]
  >([]);
  const [convertedNewInterest, setConvertedNewInterest] = useState<IItem[]>([]);
  const {searchedData, convertedSearch} = useSearchLocation({
    input: zipCode,
    isSearch: isSearch,
  });
  const checkDisplayChipWrapper =
    newInterestedAreas.length > 0 || interestedAreas.length > 0;

  useEffect(() => {
    getInterestedAreas();
  }, []);

  const getInterestedAreas = () => {
    openLoading();
    listing
      .getInterestArea()
      .then(resp => {
        closeLoading();
        setInterestedAreas(resp.data ?? []);
      })
      .catch(error => {
        closeLoading();
        showFailMessage(String(error));
      });
  };
  const deleteInterestedAreas = (itemId: string) => {
    openLoading();
    listing
      .deleteInterestArea(itemId)
      .then(res => {
        closeLoading();
        setInterestedAreas(interestedAreas.filter(e => e.mapboxId !== itemId));
        showSuccessMessage(res.message);
      })
      .catch(err => {
        closeLoading();
        showFailMessage(String(err));
      });
  };
  const onConfirm = () => {
    if (newInterestedAreas.length > 0) {
      const payload = formatNewInterest(
        convertedNewInterest,
        newInterestedAreas,
      );
      listing
        .addInterestArea({listAreaInterest: payload})
        .then(res => {
          getInterestedAreas();
          if (!interestedAreas.length) {
            showSuccessMessage(
              i18n.t('UserProfile.YouHaveAddedTheZipCodeSuccessfully'),
            );
          } else {
            showSuccessMessage(res.message);
          }
          setNewInterestedAreas([]);
          setConvertedNewInterest([]);
        })
        .catch(err => {
          closeLoading();
          showFailMessage(String(err));
        });
    }
  };
  const onSelectedSearch = (selected: IItem) => {
    setIsSearch(!isSearch);
    const checkExisted =
      interestedAreas.some(o => o.mapboxId === selected.id) ||
      newInterestedAreas.some(p => p.id === selected.id);
    if (checkExisted) {
      showFailMessage(i18n.t('common.ItemExisted'));
    } else {
      searchedData.map(e => {
        if (selected.id === e.id) {
          setNewInterestedAreas(val => {
            let tmp = [...val];
            tmp = tmp.concat(e);
            return tmp;
          });
          setConvertedNewInterest(value => {
            let temp = [...value];
            temp = temp.concat(formatTempChip([e]));
            return temp;
          });
        }
      });
    }
  };
  const onSubmitEditing = () => {
    setIsSearch(!isSearch);
  };
  const onRemoveInterestedItem = (index: number) => {
    const tmp = [...interestedAreas];
    const deletedItem = tmp.splice(index, 1);
    deleteInterestedAreas(deletedItem[0].mapboxId);
  };
  const onRemoveNewInterestedItem = (index: number) => {
    const tmp = [...convertedNewInterest];
    const deletedItem = tmp.splice(index, 1);
    setNewInterestedAreas(
      newInterestedAreas.filter(h => h.id !== deletedItem[0].id),
    );
    setConvertedNewInterest(
      convertedNewInterest.filter(d => d.id !== deletedItem[0].id),
    );
  };

  const $chipWrapper: ViewStyle = {
    flex: 1,
    borderWidth: 1,
    flexWrap: 'wrap',
    borderRadius: ratioW(8),
    marginBottom: ratioW(16),
    paddingTop: ratioW(10),
    paddingHorizontal: ratioW(16),
    paddingBottom: ratioW(2),
    display: checkDisplayChipWrapper ? 'flex' : 'none',
    borderColor: colors.inputInactiveBorder,
  };

  const title =
    user?.typeOfUser === 'NonRealiFiAgent' ||
    user?.typeOfUser === 'RealifiAgent'
      ? i18n.t('UserProfile.ServiceAreas')
      : i18n.t('UserProfile.InterestedAreas');

  const itemName = (a: IRPGetInterestAreaItem) => {
    if (!a.zipCode) {
      return a.aliasName;
    } else {
      if (!a.city) {
        return a.zipCode + ' - ' + a.aliasName;
      } else {
        return a.zipCode + ' - ' + a.city;
      }
    }
  };

  return (
    <FlexView>
      <Header title={title} />
      <ScrollView style={styles.scrollView}>
        <ZipPicker
          value={zipCode}
          onChangeText={setZipCode}
          containerStyles={styles.$input}
          label={i18n.t('UserProfile.ZipCodeAndCity')}
          values={convertedNewInterest}
          data={convertedSearch}
          onchange={onSelectedSearch}
          onShow={onSubmitEditing}
          onClose={onSubmitEditing}
          returnKeyType={'done'}
          itemPickerContainerStyle={styles.itemPickerOne}
          maxLength={254}
        />
        <RowContainer style={$chipWrapper}>
          {interestedAreas.map((a, aIndex) => {
            const onPress = () => onRemoveInterestedItem(aIndex);
            return (
              <ChipItem
                key={aIndex}
                index={aIndex}
                name={itemName(a)}
                onPress={onPress}
              />
            );
          })}
          {convertedNewInterest.map((b, bIndex) => {
            const _onPress = () => onRemoveNewInterestedItem(bIndex);
            return (
              <ChipItem
                key={bIndex}
                index={bIndex}
                name={b.name}
                onPress={_onPress}
              />
            );
          })}
        </RowContainer>
        <Button title={i18n.t('common.Confirm')} onPress={onConfirm} />
      </ScrollView>
    </FlexView>
  );
};

export default InterestedArea;

const styles = StyleSheet.create({
  $input: {
    marginBottom: ratioW(16),
  },
  scrollView: {marginTop: ratioW(8)},
  itemPickerOne: {
    borderBottomWidth: 0,
  },
});
