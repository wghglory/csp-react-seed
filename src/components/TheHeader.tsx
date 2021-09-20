import React from 'react';
import { isCdsEnv, isCspEnv, isStdEnv } from '../constants/common';
import TheHeaderCspTokenSwitcher from './TheHeaderCspTokenSwitcher';

// !!!!!!!! Must be the last one of all components import. Other components who deal with clarity icon go first.
import TheHeaderCsp from './TheHeaderCsp';

export default function TheHeader() {
  return (
    <>
      {isCspEnv ? (
        <>
          <TheHeaderCsp />
          <TheHeaderCspTokenSwitcher />
        </>
      ) : isCdsEnv ? (
        <h1>Cds Header</h1>
      ) : isStdEnv ? (
        <h1>Standalone Header</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Unknown Env</h1>
      )}
    </>
  );
}
