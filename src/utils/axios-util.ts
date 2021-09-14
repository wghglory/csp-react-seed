import axios from 'axios';
import { client, authorize, isTokenExpired } from '../core/auth/auth-client';
import { CSP_AUTH_TOKEN, IGNORE_CSP_HEADER_TOKEN } from '../constants/csp';
import { masterPaToken } from '../constants/mock-token';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_PRODUCTION_HOST}/api/pcdl/v1/`,
  // timeout: 10000,
});

// Token expired will trigger CSP token refresh step.
http.interceptors.request.use(
  async (request) => {
    // except login API, all other API request header needs token
    // Refresh token if it's expired
    if (request.url && (!request.url.startsWith('http') || request.url.indexOf(window.location.host) !== -1)) {
      if (isTokenExpired()) {
        try {
          // TODO, to be removed
          localStorage.removeItem(IGNORE_CSP_HEADER_TOKEN);
          // authorize API failed
          await client.refresh();
        } catch (e) {
          // User cannot be re-authorized, return them to the IdP. discovery page
          authorize();
        }
      }

      // Add csp auth token here
      const cspAuthToken = localStorage.getItem(CSP_AUTH_TOKEN);

      // const token = client.token();
      // request.headers.Authorization = `${token.token_type} ${token.access_token}`;

      // TODO to be removed
      const ignoreToken = localStorage.getItem(IGNORE_CSP_HEADER_TOKEN);
      if (ignoreToken) {
        request.headers[CSP_AUTH_TOKEN] = ignoreToken;
      } else {
        if (cspAuthToken) {
          request.headers[CSP_AUTH_TOKEN] = cspAuthToken;
        } else {
          // TODO, to be removed
          request.headers[CSP_AUTH_TOKEN] = masterPaToken;
        }
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// // Add a request interceptor
// http.interceptors.request.use(
//   (config) => {
//     // except login API, all other API request header needs token
//     if (!config.data?.login) {
//       const token = client.token();

//       if (token) {
//         config.headers.Authorization = `${token.token_type} ${token.access_token}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    // todo: need jump ? Probably no
    // 401 and not in login page, redirect to login
    // if (error.response.status === 401 && window.location.pathname !== '/login') {
    //   window.location.href = `${process.env.REACT_APP_BASE_HREF}login`;
    // }

    const { response } = error;
    switch (response?.status) {
      case 401:
        // todo: goto login with history push instead of window.location.href
        break;
      default:
        break;
    }

    return Promise.reject(error.response?.data || error);
  },
);

export default http;
