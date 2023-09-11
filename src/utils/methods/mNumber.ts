import isInteger from 'lodash/isInteger';

const formatNumber = (value: string) => {
  const text = value.replace(/\./g, '');
  return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const formatNumberWithDots = (value: string) => {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return parts.join('.');
};

const formatUsaCurrency = (value: number) => {
  if (value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }
  return '';
};

const fixNumber = (num: number | string) => {
  if (!num) {
    return 0;
  }
  if (isInteger(num)) {
    return num;
  }
  return Number(num).toFixed(2);
};

const removeStartZero = (value: string): string => {
  return value.replace(/^0+(?!$)/g, '');
};

// Do not start with not digit (1 - 9)
const removeAllExceptDot = (value: string): string => {
  return value.replace(/^([^1-9])/g, '').replace(/[^0-9\.]/g, '');
};

// Do not start with not digit (0 - 9)
const removeAllExceptDotWithZero = (value: string): string => {
  return value.replace(/^([^0-9])/g, '').replace(/[^0-9\.]/g, '');
};

// Only get one dot, other dots will be removed
const removeAllDotButGetOne = (str: string) => {
  return removeAllExceptDot(str).replace(/^([^.]*\.)(.*)$/, function (a, b, c) {
    return b + c.replace(/\./g, '');
  });
};

// Only get one dot, other dots will be removed
const removeAllDotButGetOneWithZero = (str: string) => {
  return removeAllExceptDotWithZero(str).replace(
    /^([^.]*\.)(.*)$/,
    function (a, b, c) {
      return b + c.replace(/\./g, '');
    },
  );
};

const formatBidValue = (
  tNeedFormat: string,
  removeZero = true,
  haveDots?: boolean,
) => {
  if (tNeedFormat === '' || tNeedFormat === '0') {
    if (removeZero) {
      return '';
    } else {
      return '0';
    }
  } else {
    switch (haveDots) {
      case true:
        return formatNumberWithDots(
          removeAllDotButGetOneWithZero(tNeedFormat).replace(/,/g, ''),
        );
      case false:
      default:
        return formatNumber(removeAllExceptDot(tNeedFormat).replace(/,/g, ''));
    }
  }
};

const removeComma = (tNeedRemove?: string) => {
  return tNeedRemove?.replace(/,/g, '');
};

const removeAllExceptNumber = (text: string) => {
  return text.replace(/\D+/g, '');
};

function addZeroToFirst(time: number) {
  return time <= 9 ? `0${time}` : time;
}

export default {
  fixNumber,
  removeComma,
  formatNumber,
  addZeroToFirst,
  formatBidValue,
  removeStartZero,
  formatUsaCurrency,
  removeAllExceptDot,
  formatNumberWithDots,
  removeAllDotButGetOne,
  removeAllExceptNumber,
  removeAllExceptDotWithZero,
  removeAllDotButGetOneWithZero,
};
