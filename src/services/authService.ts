import http from '../utils/axios';
import { CDS_AUTH_TOKEN } from '../constants/cds';
import { CSP_AUTH_TOKEN } from '../constants/csp';
import { LoginPayload, UserCds } from '../models';

/**
 * Call get current user at App.tsx if token exists, and set localStorage, global state.
 * CPN: (1) call at App.tsx if token exists.
 * CDS: (1) call at App.tsx if token exists. (2) call when clicking login button at loginPage. (3) call when redirecting from CDS with query ?jwt=xxx and target Gateway Page
 */
export async function getCurrentUser({ authMethod, token }: LoginPayload) {
  let headers;

  // CDS: (2)(1)
  if (authMethod === 'CDS_CREDENTIAL') {
    headers = {
      [CDS_AUTH_TOKEN]: token,
    };
  }

  // CDS: (3)
  if (authMethod === 'CDS_JWT') {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  // CSP: (1)
  if (authMethod === 'CSP') {
    headers = {
      [CSP_AUTH_TOKEN]: token,
    };
  }

  // interceptors will bypass login due to data: {login:true}
  return await http.get<void, UserCds>('/core/current-user', { headers, data: { login: true } });
}
