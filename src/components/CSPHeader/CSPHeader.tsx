import React, { useEffect, useRef } from 'react';
import cspHeaderConfig from './utils/csp-header-config';
import { changeOrganization, signIn, signOut } from './utils/csp-util';

import { authorize, getToken } from '../../core/auth/auth-client';

/**
 * All these imports come from the CSP Angular microfrontend. They are bundled as a separate entity
 * by Webpack.
 *
 * @ref https://ngx.eng.vmware.com/@vmw/csp-ngx-components/header/integration-guide#Non-Angular
 */
import '@clr/ui/clr-ui.min.css'; // import for styles !!!!!!!!!
import '@clr/icons/clr-icons.min.css';
import '@clr/icons/clr-icons.min.js';
import '@vmw/csp-header/csp-header';

// Custom styles required by the library
// import styles from './CSPHeader.module.css';

/**
 * Mount the CSP Microfrontend using the csp-header custom component.
 */
const CSPHeader = () => {
  // Keep the reference of the custom component
  const headerRef = useRef<any>(null);

  // Get customer auth token
  const token = getToken()?.access_token;

  // Configure it
  useEffect(() => {
    const { current: ref } = headerRef;
    if (ref == null) {
      return;
    }

    ref.environment = cspHeaderConfig.environment;
    ref.currentLanguage = cspHeaderConfig.language;
    ref.serviceRefLink = cspHeaderConfig.serviceRefLink;
    ref.options = cspHeaderConfig.options;

    // Callbacks
    ref.addEventListener('switchOrg', async (e: any) => {
      changeOrganization(e.detail.id);

      // TODO: update
      await authorize(e.refLink);
      // this.tokenService.authorize(org.refLink);
      // await this.client.authorize(state, queryStringOrg || null);
    });

    ref.addEventListener('signOut', () => {
      signOut();
    });

    ref.addEventListener('signIn', () => {
      signIn();
    });

    // Cleanup callbacks
    return () => {
      const { current: ref } = headerRef;
      if (ref == null) {
        return;
      }

      ref.removeEventListener('switchOrg');
      ref.removeEventListener('signOut');
      ref.removeEventListener('signIn');
    };
  }, [headerRef]);

  // Add the token
  useEffect(() => {
    const { current: ref } = headerRef;
    if (ref === null) {
      return;
    }

    ref.authToken = token;
  }, [headerRef, token]);

  return <csp-header-x ref={headerRef}></csp-header-x>;
};

export default CSPHeader;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csp-header-x': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
