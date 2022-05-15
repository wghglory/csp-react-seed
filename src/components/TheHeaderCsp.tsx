import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router';
import {cspHeaderConfig, LOGIN_URL} from '../constants/csp';
import {authorize, getToken, revokeToken} from '../core/auth/authClient';
import {useTheme} from '../context/ThemeContext';
import {CspTheme} from '../theme';
import {capitalize} from '../utils/common';
import {CspHeaderConfig} from '../models/csp';

/**
 * All these imports come from the CSP Angular microfrontend. They are bundled as a separate entity
 * by Webpack.
 *
 * @ref https://ngx.eng.vmware.com/@vmw/csp-ngx-components/header/integration-guide#Non-Angular
 */

import '@clr/ui/clr-ui.min.css'; // only for CSP header style
import '@clr/icons/clr-icons.min.css';
import '@clr/icons/clr-icons.min.js';

// // !!!!!!!!!!!!!!!!!!! NOTE !!!!!!!!!!!!!!!!!!!!!!!
// // This import may conflict with Clarity, so it has to be loaded late after the clarity icon,
// // otherwise the clarity icon is broken. e.g. `ClarityIcons.addIcons(cogIcon);`
// import '@vmw/csp-header/csp-header';
// // !!!!!!!!!!!!!!!!!!! NOTE !!!!!!!!!!!!!!!!!!!!!!!

// Custom styles required by the library
// import styles from './CSPHeader.module.css';

/**
 * Mount the CSP Microfrontend using the csp-header custom component.
 */

export default function TheHeaderCsp() {
  // Keep the reference of the custom component
  const headerRef = useRef<HTMLElement & CspHeaderConfig>(null);
  const [theme] = useTheme();
  const navigate = useNavigate();

  // Get customer auth token
  const token = getToken()?.access_token;

  // Configure it initially
  useEffect(() => {
    // require('@clr/ui/clr-ui.min.css'); // only for CSP header style
    // require('@clr/icons/clr-icons.min.css');
    // require('@clr/icons/clr-icons.min.js');
    // !!!!!!!!!!!!!!!!!!! NOTE !!!!!!!!!!!!!!!!!!!!!!!
    // This import may conflict with Clarity, so it has to be loaded late after the clarity icon,
    // otherwise the clarity icon is broken. e.g. `ClarityIcons.addIcons(cogIcon);`
    require('@vmw/csp-header/csp-header');
    // !!!!!!!!!!!!!!!!!!! NOTE !!!!!!!!!!!!!!!!!!!!!!!

    const {current: ref} = headerRef;
    if (ref === null) {
      return;
    }

    ref.environment = cspHeaderConfig.environment;
    ref.currentLanguage = cspHeaderConfig.currentLanguage;
    ref.serviceRefLink = cspHeaderConfig.serviceRefLink;
    ref.options = cspHeaderConfig.options;

    ref.addEventListener('switchOrg', switchOrg);
    ref.addEventListener('signOut', signOut);
    ref.addEventListener('signIn', signIn);

    return () => {
      ref.removeEventListener('switchOrg', switchOrg);
      ref.removeEventListener('signOut', signOut);
      ref.removeEventListener('signIn', signIn);
    };
  }, []);

  // Add the token
  useEffect(() => {
    const {current: ref} = headerRef;

    if (ref === null) {
      return;
    }

    ref.authToken = token;
  }, [token]);

  // Change Csp theme. Separate 3 useEffect so as to avoid multiple addEventListener registrations
  useEffect(() => {
    const {current: ref} = headerRef;
    if (ref === null) {
      return;
    }

    ref.options = {...cspHeaderConfig.options, theme: capitalize(theme) as CspTheme};
  }, [theme]);

  // Clicking logo can jump to /
  useEffect(() => {
    const {current: ref} = headerRef;
    if (ref === null) {
      return;
    }

    function pushHome() {
      navigate('/');
    }

    const timer = setTimeout(() => {
      const links = ref.querySelectorAll('a');
      links.forEach((l) => l.addEventListener('click', pushHome, false));

      return () => {
        links.forEach((l) => l.removeEventListener('click', pushHome, false));
        clearTimeout(timer);
      };
    }, 2000);
  }, [navigate]);

  return <csp-header-x ref={headerRef}></csp-header-x>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csp-header-x': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const changeOrganizationUrl = (organizationId: string, origin?: string) => {
  const result = '/auth/vmware?org_id=' + organizationId;
  return origin === null ? result : `${result}&origin=${origin}`;
};

const changeOrganization = (organizationId: string, origin?: string) => {
  window.location.assign(changeOrganizationUrl(organizationId, origin));
};

/**
 * Build the support URL based on the given organization ID
 */
// const buildSupportUrl = (organizationId: string) => {
//   const orgRefLink = `/csp/gateway/am/api/orgs/${organizationId}`;
//   return `${CSP_DOMAIN}/csp/gateway/portal/?org_link=${orgRefLink}&orgLink=${orgRefLink}/#/support`;
// };

const signOut = async () => {
  await revokeToken();
  // We need to reload the page so CSP Header gets reset
  // window.location.reload();
};

const signIn = () => {
  window.location.assign(LOGIN_URL);
};

async function switchOrg(e: any) {
  changeOrganization(e.detail.id);

  // TODO: update
  await authorize(e.refLink);
  // this.tokenService.authorize(org.refLink);
  // await this.client.authorize(state, queryStringOrg || null);
}
