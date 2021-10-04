import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import style from './LoginPage.module.css';

import { CdsFormGroup } from '@cds/react/forms';
import { CdsInput } from '@cds/react/input';

import { l10n } from '../i18n/i18nUtils';

import { useAuth } from '../context/AuthContext';

/**
 * This login page is a standalone vCD login page!
 * PA: admin@system:vmware; TA/TU: rachelw/chrisb@acme:vmware
 * The input also accepts JWT
 *
 * CSP doesn't use this login page
 */
export default function LoginPage() {
  const [token, setToken] = useState('');
  const { replace } = useHistory();
  const { state } = useLocation();
  const { user, isLoading, getUser, logout, error } = useAuth();

  // If user already login, navigate to his previous from page or home without recording browser history
  // 1. user may previously review /tenants page without login, withAuthorizationGuard will kick user to login, and after login, navigate back to that state from.
  // 2. a login user refresh /tenants page, it takes time to retrieve user from context, withAuthorizationGuard will kick user to login, at this loginPage user is available from getUser context
  // TODO: unit test a login user tries to access login, redirect to /
  useEffect(() => {
    if (user) {
      const path = (state as any)?.from || '/';
      replace(path);
    }
  }, [replace, state, user]);

  function submit(e: FormEvent) {
    e.preventDefault();
    getUser({ authMethod: 'CDS_CREDENTIAL', token });
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.login}>
        <h1 cds-text='title' className={`${style.title} mb-8`}>
          {l10n('common.product')}
        </h1>
        {/* <h3>{l10n('login.subtitle')}</h3> */}
        <form className={style.loginGroup} onSubmit={submit}>
          <CdsFormGroup layout='vertical'>
            <CdsInput layout='vertical'>
              <label style={{ visibility: 'hidden' }}>{l10n('auth.token')}</label>
              <input
                placeholder={l10n('auth.token')}
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              {/* '@cds/react/forms': <CdsControlMessage status='error'>error message</CdsControlMessage> */}
            </CdsInput>
          </CdsFormGroup>

          {error && (
            <p className='mt-6' onClick={() => logout()}>
              {error.message}
            </p>
          )}

          <button id='login' className='mt-6' disabled={isLoading || token === ''} type='submit'>
            {l10n('auth.login')}
          </button>
        </form>
      </div>
    </div>
  );
}
