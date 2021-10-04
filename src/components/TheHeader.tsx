import React from 'react';
import { isCdsMode, isCspMode, isStdMode } from '../constants/common';

import TheNavbarCsp from './TheNavbarCsp';
import TheHeaderCspTokenSwitcher from './TheHeaderCspTokenSwitcher';

// !!!!!!!! Must be the last one of all components import. Other components who deal with clarity icon go first.
import TheHeaderCsp from './TheHeaderCsp';

export default function TheHeader() {
  return (
    <>
      {isCspMode ? (
        <>
          <TheHeaderCsp />
          <TheHeaderCspTokenSwitcher />
          <TheNavbarCsp />
        </>
      ) : isCdsMode || isStdMode ? (
        <h1>Cds header</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Unknown Env</h1>
      )}
    </>
  );
}
