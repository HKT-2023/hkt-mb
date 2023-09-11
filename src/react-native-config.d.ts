declare module '@app/react-native-config' {
  export interface NativeConfig {
    BASE_URL: string;
    API_URL: string;
    ONE_SIGNAL: string;
    APP_LINK: string;
    APP_LINK_HTTPS: string;
    APP_LINK_BRANCH_IO: string;
    BRANCH_KEY: string;
    SENTRY_DSN: string;
    MAPBOX_TOKEN: string;
    GOOGLE_WEB_CLIENT_ID: string;
    GOOGLE_IOS_CLIENT_ID: string;
    IOS_GOOGLE_URL_SCHEME: string;
    YOUTUBE_API: string;
    URL_HEDERA: string;
    IOS_APP_NAME: string;
    HEDERA_TOKEN_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
