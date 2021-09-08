import React from 'react';
import './App.css';
import CSPHeader from './components/CSPHeader';

function App() {
  return (
    <div className='main-container'>
      <CSPHeader></CSPHeader>
      <div className='content-container'>
        <div className='content-area'>PCDL Welcome Page for Anonymous Users.</div>
      </div>
    </div>
  );
}

export default App;
