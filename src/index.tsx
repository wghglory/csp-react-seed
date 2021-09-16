import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { client, handleTokens } from './core/auth/auth-client';
import { removeQueryParam } from './utils/url';

async function handleAuth() {
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
          alert(error);
        },
      );

      return; // important, UI won't be rendered after validateAuthorizeResponse
    }

    handleTokens();

    resolve(true);
  });
}

handleAuth().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
