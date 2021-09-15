import { CSP_PRODUCTION_SERVICE_REF_LINK, CSP_STAGING_SERVICE_REF_LINK } from '../../../constants/csp';
import { isProduction } from '../../../environment';

/**
 * Build the configuration file for the CSP Header
 */
const options = {
  title: 'VMware Tanzu Application Catalog',
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
  docsProducts: ['VMware Tanzu Application Catalog'],
  docsDefaultSearch: 'Get Started',
  statusIOComponentId: 'p8ydm72c2q6m',
  suppressCookieAlert: true,
  brandingLogo:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48dGl0bGU+Vk13YXJlIGhlYWRlciBpY29uPC90aXRsZT48cmVjdCB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHJ4PSIzIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjE1IiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiPjwvcmVjdD48cGF0aCBkPSJNMy43OSwxNC44M2ExLjA5LDEuMDksMCwwLDAtMS40Ny0uNTYsMS4wOSwxLjA5LDAsMCwwLS41NCwxLjQ5bDIuNDcsNS40Yy4zOS44NS44LDEuMjksMS41NywxLjI5UzcsMjIsNy4zOSwyMS4xNmwyLjE3LTQuNzdhLjMzLjMzLDAsMCwxLC4zMS0uMi4zNS4zNSwwLDAsMSwuMzUuMzV2NC42MWExLjE1LDEuMTUsMCwwLDAsMS4xNCwxLjMsMS4xNywxLjE3LDAsMCwwLDEuMTctMS4zVjE3LjM4YTEuMTUsMS4xNSwwLDAsMSwxLjIyLTEuMiwxLjEzLDEuMTMsMCwwLDEsMS4xOCwxLjJ2My43N2ExLjE3LDEuMTcsMCwxLDAsMi4zMiwwVjE3LjM4YTEuMTUsMS4xNSwwLDAsMSwxLjIyLTEuMiwxLjEzLDEuMTMsMCwwLDEsMS4xOCwxLjJ2My43N2ExLjE2LDEuMTYsMCwxLDAsMi4zMSwwVjE2Ljg2YTIuNjksMi42OSwwLDAsMC0yLjc4LTIuNjksMy41NywzLjU3LDAsMCwwLTIuNDcsMS4wNSwyLjc1LDIuNzUsMCwwLDAtMi4zOC0xLjA1QTMuOTMsMy45MywwLDAsMCwxMiwxNS4yMmEyLjgyLDIuODIsMCwwLDAtMi4wOC0xLjA1QTIuNTUsMi41NSwwLDAsMCw3LjQsMTUuODlMNS44MiwxOS42M2wtMi00LjgiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNMzMsMTQuMThBMS4xNCwxLjE0LDAsMCwwLDMxLjksMTVsLTEuMTksMy43M0wyOS41LDE1LjA1YTEuMTgsMS4xOCwwLDAsMC0xLjE1LS44N2gtLjFhMS4yLDEuMiwwLDAsMC0xLjE1Ljg3bC0xLjE5LDMuNzEtMS4xOC0zLjcxYTEuMTUsMS4xNSwwLDAsMC0xLjExLS44NywxLjA4LDEuMDgsMCwwLDAtMS4xMiwxLjA3LDEuNjgsMS42OCwwLDAsMCwuMS41NGwyLDUuN2ExLjI3LDEuMjcsMCwwLDAsMS4yNywxLDEuMjQsMS4yNCwwLDAsMCwxLjItLjkzbDEuMi0zLjY0LDEuMiwzLjY0YTEuMjUsMS4yNSwwLDAsMCwxLjI2LjkzQTEuMjcsMS4yNywwLDAsMCwzMiwyMS41TDM0LDE1LjczYTEuNzcsMS43NywwLDAsMCwuMDgtLjQ4QTEuMDcsMS4wNywwLDAsMCwzMywxNC4xOFoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4K',
  subTitle: 'VMware Cloud Services', // leave this be
};

// For now, let's keep it static
const language = 'en_US';

// Environment
const environment = isProduction ? 'prd' : 'stg';

// Service Link
const serviceRefLink = isProduction ? CSP_PRODUCTION_SERVICE_REF_LINK : CSP_STAGING_SERVICE_REF_LINK;

export default {
  language,
  environment,
  serviceRefLink,
  options,
};
