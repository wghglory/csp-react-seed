import React, {createContext, useCallback, useContext, useMemo, useReducer, useRef} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import http from '../utils/axios';
import {UserCds, LoginPayload, Action} from '../models';
import {CDS_AUTH_TOKEN} from '../constants/cds';
import {CSP_AUTH_TOKEN} from '../constants/csp';
import {isCspMode} from '../constants/common';
import {getCurrentUser} from '../services/authService';

export function AuthProvider(props: any) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const location = useLocation();
  const pathRef = useRef(location.pathname);
  // const from = (location.state as any)?.from || '/';

  // !!! CALL it immediately when accessing App.tsx, and set localStorage, global state with userinfo
  const getUser = useCallback(
    async ({authMethod, token}: LoginPayload) => {
      try {
        dispatch({type: AuthActionTypes.LoginInit});

        const user = await getCurrentUser({authMethod, token});

        dispatch({
          type: AuthActionTypes.LoginSuccess,
          payload: user,
          meta: {token},
        });

        // Login successfully and set localStorage
        localStorage.setItem(authMethod === 'CSP' ? CSP_AUTH_TOKEN : CDS_AUTH_TOKEN, token);

        navigate(pathRef.current, {replace: true}); // replace(from); avoid going back by browser, if no from, redirect to '/', which will be redirect again by user role (router/index.tsx config)
      } catch (error) {
        // at App.tsx may call get current user, if no user found, redirect to login.
        // if App.tsx doesn't call get current user due to no token, and try to access /cloud-service resource, will not get here, but it will redirect to login or home by PrivateRoute
        navigate(isCspMode ? '/' : '/login', {replace: true});

        dispatch({
          type: AuthActionTypes.LoginFailure,
          error,
        });
      }
    },
    [navigate],
  );

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem(CDS_AUTH_TOKEN);
      localStorage.removeItem(CSP_AUTH_TOKEN);

      await http.delete('/logout');

      dispatch({type: AuthActionTypes.Logout});
    } catch (err) {
    } finally {
      window.location.href = '/';
    }
  }, []);

  const {user, isLoading, error, token} = state;

  const value = useMemo(
    () => ({user, isLoading, error, token, getUser, logout}),
    [user, isLoading, error, token, getUser, logout],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

// -------------------- below: types, reducers, actions, context initializer ------------------

const AuthActionTypes = {
  LoginInit: 'auth/loginInit',
  LoginSuccess: 'auth/loginSuccess',
  LoginFailure: 'auth/loginFailure',
  LoginReset: 'auth/loginReset',
  Logout: 'auth/logout',
} as const; // const are valuable

interface AuthState {
  isLoading: boolean;
  user: UserCds | null;
  token: string;
  error: Error | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  token: localStorage.getItem(CDS_AUTH_TOKEN) || '',
  error: null,
};

function authReducer(state: AuthState, action: Action<typeof AuthActionTypes, UserCds>): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginInit:
      return {
        isLoading: true,
        user: null,
        error: null,
        token: '',
      };
    case AuthActionTypes.LoginSuccess:
      return {
        isLoading: false,
        user: action.payload!,
        token: action.meta.token,
        error: null,
      };
    case AuthActionTypes.LoginFailure:
      return {
        isLoading: false,
        user: null,
        error: action.error,
        token: '',
      };
    case AuthActionTypes.LoginReset: // Click close alert
    case AuthActionTypes.Logout:
      return {
        isLoading: false,
        user: null,
        error: null,
        token: '',
      };
    default:
      throw new Error('wrong action type');
  }
}

type AuthContextState = AuthState & {
  getUser: ({authMethod, token}: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);
AuthContext.displayName = 'AuthContext';
