/**
 * Utils methods to work with the CSP
 */
import { LOGIN_URL } from '../constants/csp';

import { CSP_DOMAIN } from '../constants/csp';

const changeOrganizationUrl = (organizationId: string, origin?: string) => {
  const result = '/auth/vmware?org_id=' + organizationId;
  return origin === null ? result : `${result}&origin=${origin}`;
};

export const changeOrganization = (organizationId: string, origin?: string) => {
  window.location.assign(changeOrganizationUrl(organizationId, origin));
};

/**
 * Build the support URL based on the given organization ID
 */
export const buildSupportUrl = (organizationId: string) => {
  const orgRefLink = `/csp/gateway/am/api/orgs/${organizationId}`;

  return `${CSP_DOMAIN}/csp/gateway/portal/?org_link=${orgRefLink}&orgLink=${orgRefLink}/#/support`;
};

export const signOut = () => {
  // We need to reload the page so CSP Header gets reset
  window.location.href = '/';
};

export const signIn = () => {
  window.location.assign(LOGIN_URL);
};
