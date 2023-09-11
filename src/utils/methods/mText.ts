import i18n from '@app/i18n';
import {
  validateEmail,
  rAtLeast1Number,
  rAtLeast1Uppercase,
  rIncludeOfAtLeastOneSpecial,
} from '@app/constants/regex';

const addRequired = (t: string) => {
  return t + ' (*)';
};

/**
 * A password is valid:
 * - Have at least 8 characters
 * - Have at least 1 number and 1 uppercase character
 * - Have at least 1 special character
 */
const validatePassword = (
  password: string,
  isCompare = false,
  secondPassword?: string,
): string => {
  if (!password) {
    return '';
  }
  const errorText = '';
  const cond1 = password.length < 8;
  const c1Uppercase = new RegExp(rAtLeast1Uppercase).test(password);
  const cSpecial = new RegExp(rIncludeOfAtLeastOneSpecial).test(password);
  const cNumber = new RegExp(rAtLeast1Number).test(password);
  const cond4 = password !== secondPassword;

  if (cond1) {
    return i18n.t('Authentication.ThePasswordFieldMustHaveAtLeast8Characters');
  } else if (!c1Uppercase) {
    return i18n.t('Authentication.ThePasswordFieldMustHaveAtLeast1Uppercase');
  } else if (!cSpecial) {
    return i18n.t(
      'Authentication.ThePasswordFieldMustHaveAtLeast1SpecialCharacter',
    );
  } else if (!cNumber) {
    return i18n.t('Authentication.ThePasswordFieldMustHaveAtLeast1Number');
  } else if (isCompare && cond4) {
    return i18n.t('Authentication.TheConfirmNewPasswordDoesNotMatch');
  } else {
    return errorText;
  }
};

const emailValidator = (email?: string, isRequired = true) => {
  if (!email && isRequired) {
    return i18n.t('Validate.TheRequiredFieldMustBeFilledIn');
  } else {
    if (email && !validateEmail(email)) {
      return i18n.t('Authentication.InvalidEmailAddress');
    }
  }
  return '';
};

const getTailTitleCourse = (amount: number, type: 'video' | 'ebook') => {
  if (type === 'video') {
    if (amount > 1) {
      return i18n.t('common.videos');
    } else {
      return i18n.t('common.video');
    }
  } else {
    if (amount > 1) {
      return i18n.t('common.pages');
    } else {
      return i18n.t('common.page');
    }
  }
};

export default {
  addRequired,
  emailValidator,
  validatePassword,
  getTailTitleCourse,
};
