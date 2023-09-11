import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/min/locales';
import {isRTL} from './isRTL';
import enJson from './locales/en.json';
import {I18nManager} from 'react-native';
import mDate from '@app/utils/methods/mDate';
import * as RNLocalize from 'react-native-localize';

type TTranslatedKeys = typeof enJson;

export type TxKeyPath = RecursiveKeyOf<TTranslatedKeys>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

interface ILanguage {
  label: string;
  value: string;
  file: () => typeof enJson;
}

interface ITranslations {
  [language: string]: () => typeof enJson;
}

export const LANGUAGES: ILanguage[] = [
  {
    label: 'Vietnamese',
    value: 'vi',
    file: () => require('./locales/vi.json'),
  },
  {
    label: 'English',
    value: 'en',
    file: () => require('./locales/en.json'),
  },
];

const translations = LANGUAGES.reduce((ret, item) => {
  ret[item.value] = item.file;
  return ret;
}, {} as ITranslations);

export const setLanguage = (l: string) => {
  if (!l) {
    return;
  }
  let locale = LANGUAGES.find(
    ll => ll.value.toLowerCase() === l.toLowerCase(),
  )?.value;
  if (!locale) {
    locale = 'en';
  }
  // don't go forward if it's the same language and default language (en) was setup already
  if (i18n.locale === locale && i18n.translations?.en) {
    return;
  }
  i18n.locale = locale;
  i18n.translations = {
    ...i18n.translations,
    [locale]: translations[locale]?.(),
  };
  I18nManager.forceRTL(isRTL(locale));
  I18nManager.swapLeftAndRightInRTL(isRTL(locale));
  moment.locale(mDate.toMomentLocale(locale));
};

i18n.translations = {en: translations.en?.()};
const defaultLanguage = {languageTag: 'en', isRTL: false};
const availableLanguages = Object.keys(translations);
const {languageTag} =
  RNLocalize.findBestAvailableLanguage(availableLanguages) || defaultLanguage;

setLanguage(languageTag);
i18n.fallbacks = true;

type Ti18n = {
  isRTL: boolean;
  t(scope: TxKeyPath, options?: i18n.TranslateOptions): string;
  isTranslated: (text?: string) => boolean;
} & typeof i18n;

export default i18n as Ti18n;
