import {useEffect, useState} from 'react';
import listing from '@app/api/listing';
import {IItem} from '@app/components/atoms/Picker/ItemPickerOne';
import {IRPSearchLocationItem} from '@app/definitions/TApi';
import {showFailMessage} from '@app/utils/UMessage';

interface IUseSearchLocation {
  input: string;
  isSearch: boolean;
}
const useSearchLocation = ({input, isSearch}: IUseSearchLocation) => {
  const [searchedData, setSearchedData] = useState<IRPSearchLocationItem[]>([]);
  const [convertedSearch, setConvertedSearch] = useState<IItem[]>([]);

  const formatSearchedData = (searchData: IRPSearchLocationItem[]) => {
    let _temp: IItem[] = [];
    _temp = searchData.map(e => {
      const formatDataName = () => {
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
        name: formatDataName(),
      };
    });
    return _temp;
  };

  useEffect(() => {
    if (isSearch) {
      listing
        .searchLocation(input)
        .then(re => {
          if (re.data) {
            setSearchedData(re.data);
            const _result = formatSearchedData(re.data);
            setConvertedSearch(_result);
          }
        })
        .catch(er => {
          showFailMessage(String(er));
          setSearchedData([]);
          setConvertedSearch([]);
        });
    }
  }, [isSearch]);

  return {searchedData, convertedSearch, formatSearchedData};
};

export default useSearchLocation;
