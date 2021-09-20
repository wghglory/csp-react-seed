export const CSP_AUTH_TOKEN = 'csp-auth-token';
export const CSP_ID_TOKEN = 'csp-id-token';

// TODO: remove mock
export const IGNORE_CSP_HEADER_TOKEN = '__IGNORE_CSP_HEADER_TOKEN';
export const IS_DEFAULT_ROLE = '__IS_DEFAULT_ROLE';

export const LOGIN_URL = '/auth/vmware';

export const CSP_DOMAIN =
  process.env.NODE_ENV === 'production' ? 'https://console.cloud.vmware.com' : 'https://console-stg.cloud.vmware.com';

export const CSP_CLOUD_SERVICE_CONSOLE_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/consumer`;

export const CSP_CLOUD_SERVICE_USER_MANAGEMENT_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/consumer/usermgmt`;

export const CSP_CLOUD_SERVICE_SUPPORT_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/support`;

export const CSP_CLOUD_SERVICE_USER_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/user`;

export const CSP_CLOUD_SERVICE_ORGANIZATION_INFO_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/organization/info`;

export const CSP_CLOUD_SERVICE_BILLING_URL = `${CSP_DOMAIN}/csp/gateway/portal/#/consumer/billing`;

export const CSP_STAGING_FEATURE_FLAG_INTEGRATION_KEY =
  'aHR0cHM6Ly9jb25zb2xlLXN0Zy5jbG91ZC52bXdhcmUuY29tfHxhUkJXMjMzcTRBUGtid3JCaDc3bg==';
export const CSP_PRODUCTION_FEATURE_FLAG_INTEGRATION_KEY =
  'aHR0cHM6Ly9jb25zb2xlLmNsb3VkLnZtd2FyZS5jb218fDNWZ1UzeU1WYVczcUt3VXZuT0Ry';

export const CSP_STAGING_SERVICE_ID = '3a7e4eb5-ac84-4041-a031-003be10e3c15';
export const CSP_PRODUCTION_SERVICE_ID = '3a7e4eb5-ac84-4041-a031-003be10e3c15';

export const CSP_STAGING_SERVICE_REF_LINK = `/csp/gateway/slc/api/definitions/external/${CSP_STAGING_SERVICE_ID}`;
export const CSP_PRODUCTION_SERVICE_REF_LINK = `/csp/gateway/slc/api/definitions/external/${CSP_PRODUCTION_SERVICE_ID}`;

/**
 * Build the configuration file for the CSP Header
 */
const options = {
  title: 'VMware Public Cloud Direct Link',
  baseRoute: '/',
  helpPinnable: true,
  context: 'service', // this must be "service"
  showBackdrop: true,
  showOrgSwitcher: true,
  showSignIn: true,
  showHelpMenu: true,
  showNotificationsMenu: true,
  enableSignout: true,
  enableChangeDefaultOrg: true,
  enableIntercom: false,
  docsProducts: ['VMware Public Cloud Direct Link'],
  docsDefaultSearch: 'Get Started',
  statusIOComponentId: 'p8ydm72c2q6m',
  suppressLinkingAlert: true,
  suppressCookieAlert: true,
  brandingLogo:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48dGl0bGU+Vk13YXJlIGhlYWRlciBpY29uPC90aXRsZT48cmVjdCB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHJ4PSIzIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjE1IiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiPjwvcmVjdD48cGF0aCBkPSJNMy43OSwxNC44M2ExLjA5LDEuMDksMCwwLDAtMS40Ny0uNTYsMS4wOSwxLjA5LDAsMCwwLS41NCwxLjQ5bDIuNDcsNS40Yy4zOS44NS44LDEuMjksMS41NywxLjI5UzcsMjIsNy4zOSwyMS4xNmwyLjE3LTQuNzdhLjMzLjMzLDAsMCwxLC4zMS0uMi4zNS4zNSwwLDAsMSwuMzUuMzV2NC42MWExLjE1LDEuMTUsMCwwLDAsMS4xNCwxLjMsMS4xNywxLjE3LDAsMCwwLDEuMTctMS4zVjE3LjM4YTEuMTUsMS4xNSwwLDAsMSwxLjIyLTEuMiwxLjEzLDEuMTMsMCwwLDEsMS4xOCwxLjJ2My43N2ExLjE3LDEuMTcsMCwxLDAsMi4zMiwwVjE3LjM4YTEuMTUsMS4xNSwwLDAsMSwxLjIyLTEuMiwxLjEzLDEuMTMsMCwwLDEsMS4xOCwxLjJ2My43N2ExLjE2LDEuMTYsMCwxLDAsMi4zMSwwVjE2Ljg2YTIuNjksMi42OSwwLDAsMC0yLjc4LTIuNjksMy41NywzLjU3LDAsMCwwLTIuNDcsMS4wNSwyLjc1LDIuNzUsMCwwLDAtMi4zOC0xLjA1QTMuOTMsMy45MywwLDAsMCwxMiwxNS4yMmEyLjgyLDIuODIsMCwwLDAtMi4wOC0xLjA1QTIuNTUsMi41NSwwLDAsMCw3LjQsMTUuODlMNS44MiwxOS42M2wtMi00LjgiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNMzMsMTQuMThBMS4xNCwxLjE0LDAsMCwwLDMxLjksMTVsLTEuMTksMy43M0wyOS41LDE1LjA1YTEuMTgsMS4xOCwwLDAsMC0xLjE1LS44N2gtLjFhMS4yLDEuMiwwLDAsMC0xLjE1Ljg3bC0xLjE5LDMuNzEtMS4xOC0zLjcxYTEuMTUsMS4xNSwwLDAsMC0xLjExLS44NywxLjA4LDEuMDgsMCwwLDAtMS4xMiwxLjA3LDEuNjgsMS42OCwwLDAsMCwuMS41NGwyLDUuN2ExLjI3LDEuMjcsMCwwLDAsMS4yNywxLDEuMjQsMS4yNCwwLDAsMCwxLjItLjkzbDEuMi0zLjY0LDEuMiwzLjY0YTEuMjUsMS4yNSwwLDAsMCwxLjI2LjkzQTEuMjcsMS4yNywwLDAsMCwzMiwyMS41TDM0LDE1LjczYTEuNzcsMS43NywwLDAsMCwuMDgtLjQ4QTEuMDcsMS4wNywwLDAsMCwzMywxNC4xOFoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4K',
  // brandingDarkLogo: '',
  brandingTextColor: '#FFFFFF',
  brandingDarkTextColor: '#FFFFFF',
  brandingBackgroundColor: '#304250',
  brandingDarkBackgroundColor: '#0F161B',
  subTitle: 'VMware Cloud Services', // leave this be
};
const language = 'en_US';
const environment = process.env.NODE_ENV === 'production' ? 'prd' : 'stg';
const serviceRefLink =
  process.env.NODE_ENV === 'production' ? CSP_PRODUCTION_SERVICE_REF_LINK : CSP_STAGING_SERVICE_REF_LINK;

export const cspHeaderConfig = {
  language,
  environment,
  serviceRefLink,
  options,
};
