const USES_RTL_LAYOUT = [
  'ar',
  'ckb',
  'fa',
  'he',
  'ks',
  'lrc',
  'mzn',
  'ps',
  'ug',
  'ur',
  'yi',
];

export const isRTL = (locale?: string) =>
  locale ? USES_RTL_LAYOUT.includes(locale) : false;
