import axios, { AxiosRequestConfig } from 'axios';
import { client, authorize, isTokenExpired } from '../core/auth/authClient';
import { isCspMode } from '../constants/common';
import { CDS_AUTH_TOKEN } from '../constants/cds';
import { CSP_AUTH_TOKEN } from '../constants/csp';
import { masterPaToken, IGNORE_CSP_HEADER_TOKEN } from '../constants/mockToken';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_PRODUCTION_HOST}/api/pcdl/v1/`,
  // timeout: 10000,
});

function vCDRequestInterceptor(config: AxiosRequestConfig) {
  // except login API, all other API request header needs token
  if (!config.data?.login) {
    // todo: check token, state.auth.token for further request

    const token = localStorage.getItem(CDS_AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // const state = store.getState();

    // if (state?.auth?.token) {
    //   config.headers.Authorization = 'Bearer ' + state.auth.token;
    // }
  }

  return config;
}

async function cspRequestInterceptor(request: AxiosRequestConfig) {
  // except login API, all other API request header needs token
  // Refresh token if it's expired
  if (request.url && (!request.url.startsWith('http') || request.url.indexOf(window.location.host) !== -1)) {
    if (isTokenExpired()) {
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

    // Add csp auth token here
    const cspAuthToken = localStorage.getItem(CSP_AUTH_TOKEN);

    // const token = client.token();
    // request.headers.Authorization = `${token.token_type} ${token.access_token}`;

    // TODO, mock to be removed
    const ignoreToken = localStorage.getItem(IGNORE_CSP_HEADER_TOKEN);
    if (ignoreToken) {
      request.headers[CSP_AUTH_TOKEN] = ignoreToken;
    } else {
      if (cspAuthToken) {
        request.headers[CSP_AUTH_TOKEN] = cspAuthToken;
      } else {
        // TODO, mock to be removed
        request.headers[CSP_AUTH_TOKEN] = masterPaToken;
      }
    }
  }

  return request;
}

http.interceptors.request.use(isCspMode ? cspRequestInterceptor : vCDRequestInterceptor, (error) => {
  return Promise.reject(error);
});

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
        // TODO: For CDS only, window.location.href = '/'. may need a timer to delay redirection; CPN will refresh token
        break;
      default:
        break;
    }

    return Promise.reject(error.response?.data || error);
  },
);

export default http;
