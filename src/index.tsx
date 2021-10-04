import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';

import { ReactQueryDevtools } from 'react-query/devtools';

import { i18nClient } from './i18n/i18nClient';

import './index.css';

import App from './App';
import { AppProviders } from './context';

import { handleCspAuth } from './core/auth/authClient';
import { isCspMode, PCDL_MODE, __PCDL_MODE__ } from './constants/common';

function __setMode__() {
  if (!PCDL_MODE) {
    const mode = `${process.env.REACT_APP_INTEGRATION_MODE}`;
    console.warn(`set PCDL Mode: ${mode}`);
    localStorage.setItem(__PCDL_MODE__, mode);
  }
}

(async () => {
  await i18nClient.coreService.loadI18nData();
  if (isCspMode) {
    await handleCspAuth();
  }

  // Dev only
  if (process.env.NODE_ENV === 'development') {
    __setMode__();
  }

  ReactDOM.render(
    <AppProviders>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>,
    document.getElementById('root'),
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
