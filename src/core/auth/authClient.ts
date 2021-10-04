import { OAuth2Client, JWT } from '@vmw/csp-oauth2';
import { oauth2configuration } from './authConfig';
import { CSP_AUTH_TOKEN, CSP_ID_TOKEN } from '../../constants/csp';
import { IGNORE_CSP_HEADER_TOKEN } from '../../constants/mockToken';
import { getQueryParam, removeQueryParam } from '../../utils/url';

// 1. Initialize OAuth client and get token. No API call.
export const client: OAuth2Client = new OAuth2Client(oauth2configuration);
// export function client() {
//   if (!client) {
//     client = new OAuth2Client(oauth2configuration);
//   }
//   return client;
// }

// 2. Verify this token. (1) if token is not valid,

export function getToken() {
  return client.token();
}

export function isTokenExpired() {
  const token = getToken();
  return !token || JWT.isExpired(token.access_token) || JWT.isExpired(token.id_token);
}

// Upon successful or failed authorization, the browser will be redirected to the `redirectUri` that was originally configured.
//  When this route is loaded, you can verify the response, and retrieve the state information that was originally set.
export async function validateOAuthResponse() {
  try {
    // If the authorization response in the URL is valid, this call will return the state information, and load the
    // access token into memory. It can then be accessed directly.
    // const additionalStateInformation = await client.validateAuthorizeResponse();
    await client.validateAuthorizeResponse();
    const token = getToken();

    window.localStorage.setItem(CSP_AUTH_TOKEN, token.access_token);
    window.localStorage.setItem(CSP_ID_TOKEN, token.id_token);
    window.localStorage.setItem('csp-instance', 'stg');

    removeQueryParam('code');
    removeQueryParam('state');

    // myRoutingHandler.navigateTo(additionalStateInformation.lastVisitedUrl);
  } catch (e: any) {
    // Handle a failed authorization response.
    console.log(e);
  }
}

// Go to discovery page
export async function authorize(queryStringOrg?: string, state = {}) {
  // TODO, mock to be removed
  localStorage.removeItem(IGNORE_CSP_HEADER_TOKEN);

  // go to discovery
  await client.authorize(state, queryStringOrg);
  // after discovery, go back to index.ts if(code -1),
}

// Refresh a token
async function refresh() {
  try {
    // TODO, mock to be removed
    localStorage.removeItem(IGNORE_CSP_HEADER_TOKEN);

    // authorize API failed
    await client.refresh();
  } catch (e) {
    // User cannot be re-authorized, return them to the IdP. discovery page
    authorize();
  }
}

export async function revokeToken() {
  await client.revoke();
}

export async function handleTokens() {
  const token = getToken();
  if (token) {
    const queryStringOrg = getQueryParam('orgLink');
    removeQueryParam('orgLink');
    removeQueryParam('org_link');
    // Auth with target org
    if (queryStringOrg) {
      authorize(queryStringOrg);
    } else {
      if (isTokenExpired()) {
        refresh();
      }
    }
  }
}

// // Check for an existing, valid token
// export async function validateToken() {
//   if (isTokenExpired()) {
//     try {
//       await client.refresh();
//     } catch (e) {
//       // Authorize the user with CSP
//       const additionalStateInformation = {
//         lastVisitedUrl: window.location.href,
//         // lastVisitedUrl: 'https://example.com/the/users/deep-linked/route',
//       };

//       // If the orgLink is passed in the URL, we can trigger a login for a specific org.
//       const params = new URLSearchParams(window.location.search);
//       const orgLink = params.get('orgLink') || undefined;
//       // const orgLink = getQueryParam('orgLink');

//       // Refreshing failed, force the user into a login.
//       // This will unload the application and redirect the user to the authorization server.
//       await client.authorize(/* ... state information ... */ additionalStateInformation, orgLink);
//     }
//   }
// }

export function getTokenClaims() {
  const accessToken = JWT.parse(client.accessToken()).claims;
  const idToken = JWT.parse(client.idToken()).claims;
  return { accessToken, idToken };

  //   // Information in the access token:
  // console.log(accessToken.iat);                // The timestamp when this token was issued
  // console.log(accessToken.exp);                // The expiration timestamp
  // console.log(accessToken.context_name);       // CSP Organization ID
  // console.log(accessToken.acct);               // User Account Name
  // console.log(accessToken.perms);              // List of granted permissions.

  // // Information in the ID token:
  // console.log(idToken.auth_time);              // When the user was originally authorized
  // console.log(idToken.iat);                    // The timestamp when this token was issued
  // console.log(idToken.exp);                    // The expiration timestamp
  // console.log(idToken.given_name);             // User given name
  // console.log(idToken.family_name);            // User family name
  // console.log(idToken.email);                  // User email address
  // console.log(idToken.context_name);           // CSP Organization ID
}

export async function handleCspAuth() {
  return new Promise((resolve) => {
    // Page redirected from CSP discovery page will trigger a fully reload of application, so if block will be checked multiple times depending on how many redirects.
    if (window.location.search.indexOf('code=') !== -1) {
      client.validateAuthorizeResponse().then(
        () => {
          removeQueryParam('code');
          removeQueryParam('state');

          handleTokens();

          resolve(true);
        },
        (error: any) => {
          // CPN Devops needs to add PCDL as a service with PM approval, otherwise see below error
          // error: "invalid_verifier"
          // error_description: "Token verifier does not match.
          console.error(error);
        },
      );

      return; // important, UI won't be rendered after validateAuthorizeResponse
    }

    handleTokens();

    resolve(true);
  });
}
