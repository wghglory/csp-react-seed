import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router';

import routeConfig from './routes/routeConfig';

import { useAuth } from './context/AuthContext';
import { CDS_AUTH_TOKEN } from './constants/cds';
import { CSP_AUTH_TOKEN } from './constants/csp';
import { isCdsMode, isCspMode, isStdMode } from './constants/common';

// !!! PUT this at last in case of any CSP header bug
import TheHeader from './components/TheHeader';

function App() {
  const { getUser } = useAuth();

  useEffect(() => {
    // based on env, get token. if there's a token, get current user
    if (isCdsMode || isStdMode) {
      const token = localStorage.getItem(CDS_AUTH_TOKEN);
      token && getUser({ authMethod: 'CDS_CREDENTIAL', token });
    } else if (isCspMode) {
      const token = localStorage.getItem(CSP_AUTH_TOKEN);
      token && getUser({ authMethod: 'CSP', token });
    }
  }, [getUser]);

  return (
    <div cds-layout='vertical align:horizontal-stretch' style={{ height: '100vh' }}>
      <Suspense fallback={<div>loading</div>}>
        <TheHeader />
        <div className='content-container'>
          <div className='content-area'>
            <Switch>
              {routeConfig.map((item, index) => (
                <Route key={index} path={item.path} exact={item.exact} component={item.component} />
              ))}
            </Switch>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
