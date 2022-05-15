import React, {lazy} from 'react';

import HomePage from '../pages/HomePage';
import {PATH_ABOUT, PATH_API_TOKEN, PATH_CLOUD_CONNECTION, PATH_CLOUD_SERVICE, PATH_TENANTS} from './const';

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
  element: JSX.Element;
}

// NOTE: order matters due to menu order, may consider separate Route and Navigation Menu
const routeConfig: RouteItem[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: PATH_CLOUD_CONNECTION,
    element: <ConnectionPage />,
  },
  {
    path: PATH_TENANTS,
    element: <TenantPage />,
  },
  {
    path: PATH_CLOUD_SERVICE,
    element: <ServicePage />,
  },
  {
    path: PATH_API_TOKEN,
    element: <TokenPage />,
  },
  {
    path: PATH_ABOUT,
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/no-access',
    element: <NoAccessPage />,
  },
  {
    path: '**',
    element: <NotFoundPage />,
  },
];

export default routeConfig;
