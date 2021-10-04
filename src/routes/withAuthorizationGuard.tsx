import React from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { isCspMode } from '../constants/common';
import { UserRole } from '../models';
import { navMenus } from './navMenus';

export default function withAuthorizationGuard<T>(Component: React.ComponentType<T>) {
  return function Hoc(props: T) {
    const { user } = useAuth();
    const { path } = useRouteMatch();

    if (!user) {
      return (
        <Redirect
          to={{
            pathname: isCspMode ? '/' : '/login',
            state: { from: path },
          }}
        />
      );
    }

    const config = navMenus.find((n) => n.to === path);
    const pathAllowedRoles: UserRole[] = config ? config.roles : [];

    if (pathAllowedRoles.includes(user.role)) {
      return <Component {...(props as T)} />;
    } else {
      // user role doesn't match route path,
      // e.g. PA accessed a TA path.
      return <Redirect to={{ pathname: '/no-access' }} />;
    }
  };
}
