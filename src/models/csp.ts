export interface CspOption {
  theme: 'Light' | 'Dark';
  title: string;
  baseRoute: string;
  helpPinnable: boolean;
  context: string;
  showBackdrop: boolean;
  showOrgSwitcher: boolean;
  showSignIn: boolean;
  showHelpMenu: boolean;
  showNotificationsMenu: boolean;
  enableSignout: boolean;
  enableChangeDefaultOrg: boolean;
  enableIntercom: boolean;
  docsProducts: string[];
  docsDefaultSearch: string;
  statusIOComponentId: string;
  suppressLinkingAlert: boolean;
  suppressCookieAlert: boolean;
  brandingLogo: string;
  brandingDarkLogo: string;
  brandingTextColor: string;
  brandingDarkTextColor: string;
  brandingBackgroundColor: string;
  brandingDarkBackgroundColor: string;
  subTitle: string;
}

export interface CspHeaderConfig {
  currentLanguage: string;
  environment: 'stg' | 'prd';
  serviceRefLink: string;
  options: CspOption;
  authToken: string;
}
