import React, { useEffect, useRef } from 'react';
import cspHeaderConfig from './utils/cspHeaderConfig';
import { changeOrganization, signIn, signOut } from '../../utils/csp';

/**
 * All these imports come from the CSP Angular microfrontend. They are bundled as a separate entity
 * by Webpack.
 *
 * @ref https://ngx.eng.vmware.com/@vmw/csp-ngx-components/header/integration-guide#Non-Angular
 */
import '@clr/icons/clr-icons.min.css';
import '@vmw/csp-header/csp-header';
import '@clr/icons/clr-icons.min';

// Custom styles required by the library
import './CSPHeader.module.css';

/**
 * Mount the CSP Microfrontend using the csp-header custom component.
 */
const CSPHeader = () => {
  // Keep the reference of the custom component
  const headerRef = useRef(null);

  // Get customer auth token
  const token = '';

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
    ref.addEventListener('switchOrg', (e) => {
      changeOrganization(e.detail.id);
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
    if (ref == null) {
      return;
    }

    ref.authToken = token;
  }, [headerRef, token]);

  return <csp-header-x ref={headerRef}></csp-header-x>;
};

export default CSPHeader;
