import React, { lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import { PATH_ABOUT, PATH_API_TOKEN, PATH_CLOUD_CONNECTION, PATH_CLOUD_SERVICE, PATH_TENANTS } from './const';

// PA
const ConnectionPage = lazy(() => import('../pages/ConnectionPage'));
const TenantPage = lazy(() => import('../pages/TenantPage'));

// TA TU
const ServicePage = lazy(() => import('../pages/ServicePage'));
const TokenPage = lazy(() => import('../pages/TokenPage'));

// Common
const AboutPage = lazy(() => import('../pages/AboutPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const NoAccessPage = lazy(() => import('../pages/NoAccessPage'));

interface RouteItem {
  path: string;
  exact?: boolean;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

// NOTE: order matters due to menu order, may consider separate Route and Navigation Menu
const routeConfig: RouteItem[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: PATH_CLOUD_CONNECTION,
    component: ConnectionPage,
  },
  {
    path: PATH_TENANTS,
    component: TenantPage,
  },
  {
    path: PATH_CLOUD_SERVICE,
    component: ServicePage,
  },
  {
    path: PATH_API_TOKEN,
    component: TokenPage,
  },
  {
    path: PATH_ABOUT,
    component: AboutPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/no-access',
    component: NoAccessPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routeConfig;
