import React, { useEffect, useState } from 'react';
import './App.css';
import TheCspTokenSwitcher from './components/TheCspTokenSwitcher';
import http from './utils/axios';

// !!!!!!!! Must be the last one of all components import. Other components who deal with clarity icon go first.
import TheCspHeader from './components/TheCspHeader';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    // API call triggers axios interceptor to call CSP refresh/authorize
    http.get('/core/current-user').then(
      (res) => {
        setUser(JSON.stringify(res, null, 2));
      },
      (err) => setUser(JSON.stringify(err, null, 2)),
    );
    return () => {};
  }, []);

  return (
    <div className='main-container'>
      <TheCspHeader />
      <TheCspTokenSwitcher />
      <div className='content-container'>
        <div className='content-area'>
          <pre>{user}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
