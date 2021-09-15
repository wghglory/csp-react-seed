import React, { useEffect } from 'react';
import './App.css';
import CSPHeader from './components/CSPHeader';
import CSPTokenSwitcher from './components/CSPTokenSwitcher';
import Test from './components/Test';

import http from './utils/axios';

function App() {
  useEffect(() => {
    http.get('/core/current-user').then((res) => {
      console.log(res);
    });
    return () => {};
  }, []);
  return (
    <div className='main-container'>
      <CSPHeader />
      <Test />
      <div className='content-container'>
        <div className='content-area'>PCDL Welcome Page for Anonymous Users.</div>
      </div>
    </div>
  );
}

export default App;
