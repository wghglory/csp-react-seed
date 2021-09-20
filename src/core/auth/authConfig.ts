import { OAuth2ClientConfiguration } from '@vmw/csp-oauth2';

export const oauth2configuration: OAuth2ClientConfiguration = {
  // The hostname of the CSP environment to use.
  cspHostname: 'https://console-stg.cloud.vmware.com',

  // The Client ID from your service client.
  clientId: 'pcdl-sso-test-client',

  // The SPA's *LOCAL* redirect URI to which the OAuth2 response should be returned.
  // This is the route in your application that knows how to parse an OAuth2 success or error response.
  redirectUri: window.location.origin, // 'https://my-server.example.com/oauth2/authorize_callback',

  // List of desired scopes to be issued in the token. The default (empty) behavior is to issue all available scopes
  // for this user/client combination.
  scopes: [
    // 'csp:cross_org_operator',
    // 'csp:msp_user',
    // 'csp:org_member',
    // 'csp:org_owner',
    // 'csp:platform_operator',
    // 'csp:service_owner',
    // 'csp:support_user',
    // 'customer_number',
    // 'external/5033276b-d0a0-4a0b-bd70-3f2c423ff7cf/ngx_eng:admin',
    // 'external/5033276b-d0a0-4a0b-bd70-3f2c423ff7cf/ngx_eng:user',
  ],

  // How to store your OAuth2 tokens on the local browser. This defaults to the 'most-secure-implementation' strategy
  // of 'session' (SessionStorage) first, and can be changed to 'local' (LocalStorage) to ensure that a token can
  // be shared between browser tabs.
  storage: 'session',
};
