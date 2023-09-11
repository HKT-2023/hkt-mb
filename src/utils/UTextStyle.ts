import {Platform, StyleSheet} from 'react-native';

export const PoppinsFonts = {
  Black: {
    fontFamily: 'Poppins-Black', // 900
  },
  BlackItalic: {
    fontFamily: 'Poppins-BlackItalic', // 900
  },
  Bold: {
    fontFamily: 'Poppins-Bold', // 700
  },
  BoldItalic: {
    fontFamily: 'Poppins-BoldItalic', // 700
  },
  ExtraBold: {
    fontFamily: 'Poppins-ExtraBold', // 800
  },
  ExtraBoldItalic: {
    fontFamily: 'Poppins-ExtraBoldItalic', // 800
  },
  ExtraLight: {
    fontFamily: 'Poppins-ExtraLight', // 200
  },
  ExtraLightItalic: {
    fontFamily: 'Poppins-ExtraLightItalic', // 200
  },
  Italic: {
    fontFamily: 'Poppins-Italic', // 200
  },
  Light: {
    fontFamily: 'Poppins-Light', // 300
  },
  LightItalic: {
    fontFamily: 'Poppins-LightItalic', // 300
  },
  Medium: {
    fontFamily: 'Poppins-Medium', // 500
  },
  MediumItalic: {
    fontFamily: 'Poppins-MediumItalic', // 500
  },
  Regular: {
    fontFamily: 'Poppins-Regular', // 400
  },
  SemiBold: {
    fontFamily: 'Poppins-SemiBold', // 600
  },
  SemiBoldItalic: {
    fontFamily: 'Poppins-SemiBoldItalic', // 600
  },
  Thin: {
    fontFamily: 'Poppins-Thin', // 100
  },
  ThinItalic: {
    fontFamily: 'Poppins-ThinItalic', // 100
  },
};

export const TPoppinsStyle = StyleSheet.create({
  H6496Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 64,
    lineHeight: 96,
  },
  H4552Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 45,
    lineHeight: 52,
  },
  H4864Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 48,
    lineHeight: 64,
  },
  H3248Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 32,
    lineHeight: 48,
  },
  H3248Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 32,
    lineHeight: 48,
  },
  H2436Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 24,
    lineHeight: 36,
  },
  H2436Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 24,
    lineHeight: 36,
  },
  H2436Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 24,
    lineHeight: 36,
  },
  H2228Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
    }),
    fontSize: 22,
    lineHeight: 28,
  },
  H2028BoldCap: {
    ...PoppinsFonts.Black,
    ...Platform.select({
      ios: {
        fontWeight: '900',
      },
    }),
    fontSize: 20,
    lineHeight: 28,
  },
  H2028Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 20,
    lineHeight: 28,
  },
  H2028Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 20,
    lineHeight: 28,
  },
  H2028Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 20,
    lineHeight: 28,
  },
  H1826Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 18,
    lineHeight: 26,
  },
  H1826Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 18,
    lineHeight: 26,
  },
  H1826Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 18,
    lineHeight: 26,
  },
  H1624Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 16,
    lineHeight: 24,
  },
  H1624Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 16,
    lineHeight: 24,
  },
  H1624Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 16,
    lineHeight: 24,
  },
  H1420Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 14,
    lineHeight: 20,
  },
  H1420Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 14,
    lineHeight: 20,
  },
  H1420Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 14,
    lineHeight: 20,
  },
  H1216Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 12,
    lineHeight: 16,
  },
  H1216Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: 12,
    lineHeight: 16,
  },
  H1216Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 12,
    lineHeight: 16,
  },
  H812Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 8,
    lineHeight: 12,
  },
  H1012Bold: {
    ...PoppinsFonts.Bold,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 10,
    lineHeight: 12,
  },
  H1012Medium: {
    ...PoppinsFonts.Medium,
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
    }),
    fontSize: 10,
    lineHeight: 12,
  },
  H1012Regular: {
    ...PoppinsFonts.Regular,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    fontSize: 10,
    lineHeight: 12,
  },
});
