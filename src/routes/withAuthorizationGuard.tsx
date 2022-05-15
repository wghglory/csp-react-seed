import React from 'react';

import {Navigate, useLocation} from 'react-router-dom';

import {useAuth} from '../context/AuthContext';
import {isCspMode} from '../constants/common';
import {UserRole} from '../models';
import {navMenus} from './navMenus';

export default function withAuthorizationGuard<T>(Component: React.ComponentType<T>) {
  return function Hoc(props: T) {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
      return (
        <Navigate
          to={{
            pathname: isCspMode ? '/' : '/login',
          }}
        />
      );
    }

    const config = navMenus.find((n) => n.to === location.pathname);
    const pathAllowedRoles: UserRole[] = config ? config.roles : [];

    if (pathAllowedRoles.includes(user.role)) {
      return <Component {...(props as T)} />;
    } else {
      // user role doesn't match route path,
      // e.g. PA accessed a TA path.
      return <Navigate to={{pathname: '/no-access'}} />;
    }
  };
}
