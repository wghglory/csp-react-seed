import React from 'react';
import './App.css';
import CSPHeader from './components/CSPHeader';
import Test from './components/Test';

function App() {
  return (
    <div className='main-container'>
      <CSPHeader />

      <div className='content-container'>
        <div className='content-area'>
          Icon inside Test component doesn't show correctly. The next line always shows a loading icon.
          <Test />
          <p>If CSPHeader is commented out, and refresh the page, the icon will display.</p>
          <p>How does CSP header affect the icon? Why it doesn't in your project?</p>
          <p>
            csp-header-x seems not have a Shadow DOM, is this on purpose? How to avoid polluting the application without
            Shadow DOM?
          </p>
          <p>If upgrading clr/react from v4 to cds/react v5.5.3 (latest), UI will be broken.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
