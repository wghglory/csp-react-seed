import React, { useCallback, useEffect, useState } from 'react';
import { CdsIcon } from '@cds/react/icon';
import { ClarityIcons, cogIcon } from '@cds/core/icon';
import { CSP_AUTH_TOKEN, IGNORE_CSP_HEADER_TOKEN, IS_DEFAULT_ROLE } from '../constants/csp';
import { customerOrg, customerTuToken, masterOrg, masterPaToken } from '../constants/mockToken';
import { getToken } from '../core/auth/authClient';

ClarityIcons.addIcons(cogIcon);

// TODO, to be removed. ONLY FOR DEV
export default function TheCspTokenSwitcher() {
  const [authToken] = useState(getToken()?.access_token);
  const [visible, setVisible] = useState(true);
  const [defaultToken, setDefaultToken] = useState(masterPaToken);
  const [customToken, setCustomToken] = useState('');
  const USE_CUSTOM = 'csp-auth-token-custom';
  const isDevEnv = true;

  function toggle() {
    setVisible(!visible);
  }

  function switchRole(token: string, isCustom: boolean, isDefault?: boolean) {
    localStorage.setItem(IGNORE_CSP_HEADER_TOKEN, token);

    // default tenant/provider role
    if (isDefault) {
      localStorage.setItem(IS_DEFAULT_ROLE, '1');
    } else {
      localStorage.removeItem(IS_DEFAULT_ROLE);
    }

    // remove mock flag first
    localStorage.removeItem(USE_CUSTOM);
    if (isCustom) {
      localStorage.setItem(USE_CUSTOM, '1');
      window.location.href = '/';
      return;
    }

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const initToken = useCallback(() => {
    if (!isDevEnv) {
      return;
    }

    const cspAuthToken = localStorage.getItem(CSP_AUTH_TOKEN);
    const ignoreToken = localStorage.getItem(IGNORE_CSP_HEADER_TOKEN);

    if (ignoreToken) {
      if (!!localStorage.getItem(USE_CUSTOM)) {
        setCustomToken(ignoreToken);
      }
      setDefaultToken(ignoreToken);
    } else {
      if (cspAuthToken) {
        if (!!localStorage.getItem(USE_CUSTOM) || authToken) {
          setCustomToken(cspAuthToken);
        }
        setDefaultToken(cspAuthToken);
      } else {
        localStorage.setItem(CSP_AUTH_TOKEN, defaultToken);
      }
    }
  }, [authToken, defaultToken, isDevEnv]);

  useEffect(() => {
    initToken();
    return () => {};
  }, [initToken]);

  return (
    <>
      {/* *ngIf="authService.isAuthenticated && !loading" */}
      <div
        style={{
          float: 'right',
          width: 0,
          height: 0,
          position: 'relative',
          top: '-1.5rem',
          left: '6px',
          cursor: 'pointer',
        }}
      >
        <CdsIcon shape='cog' onClick={toggle} size='24'></CdsIcon>
      </div>

      {/* <nav *ngIf="!loading && (mock.visible || !authService.isAuthenticated)"   */}
      {visible && (
        <nav className='subnav'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              switchRole(customToken, true);
            }}
          >
            <ul className='nav'>
              <li className='nav-item'>
                <div className='clr-radio-wrapper'>
                  <input
                    onChange={(e) => {
                      setCustomToken('');
                      setDefaultToken(e.target.value);
                      switchRole(masterPaToken, false, true);
                    }}
                    checked={defaultToken === masterPaToken}
                    type='radio'
                    id='default-provider-input'
                    name='radio-full'
                    value={masterPaToken}
                    className='clr-radio'
                  />
                  <label title={masterOrg.name} htmlFor='default-provider-input' className='clr-control-label'>
                    Default Provider User
                  </label>
                </div>
              </li>
              <li className='nav-item'>
                <div className='clr-radio-wrapper'>
                  <input
                    onChange={(e) => {
                      setCustomToken('');
                      setDefaultToken(e.target.value);
                      switchRole(customerTuToken, false, true);
                    }}
                    checked={defaultToken === customerTuToken}
                    type='radio'
                    id='default-tenant-input'
                    name='radio-full'
                    value={customerTuToken}
                    className='clr-radio'
                  />
                  <label title={customerOrg.name} htmlFor='default-tenant-input' className='clr-control-label'>
                    Default Tenant User
                  </label>
                </div>
              </li>
              <li className='nav-item'>
                <div className='clr-radio-wrapper'>
                  <input
                    onChange={(e) => {
                      setCustomToken('');
                      setDefaultToken(e.target.value);
                      switchRole(authToken, false);
                    }}
                    checked={defaultToken === authToken}
                    type='radio'
                    id='csp-header-input'
                    name='radio-full'
                    value={authToken}
                    className='clr-radio'
                  />
                  <label htmlFor='csp-header-input' className='clr-control-label'>
                    CSP Header User
                  </label>
                </div>
              </li>
              <li className='nav-item'>
                <div className='clr-radio-wrapper'>
                  <input
                    onChange={() => {
                      switchRole(customToken, true);
                    }}
                    checked={customToken !== ''}
                    type='radio'
                    id='custom-csp-input'
                    name='radio-full'
                    className='clr-radio'
                    value='custom-token'
                  />
                  <label htmlFor='custom-csp-input' className='clr-control-label'>
                    Custom CSP User
                    <input
                      className='clr-input'
                      name='token'
                      value={customToken}
                      onChange={(e) => setCustomToken(e.target.value)}
                      placeholder="Input CSP token and press 'Enter'"
                    />
                  </label>
                </div>
              </li>
            </ul>
          </form>
        </nav>
      )}
    </>
  );
}
