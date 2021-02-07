import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';

import RegisterView from './views/auth/RegisterView';


import SettingsView from './views/settings';
import AccountView from './views/account/AccountView';

import News from './views/news';
import Contents from './views/contents';
import Categories from './views/categories';



const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/news" /> },

      { path: 'account', element: <AccountView /> },

      { path: 'news', element: <News /> },
      { path: 'contents', element: <Contents /> },
      { path: 'categories', element: <Categories /> },

      { path: 'settings', element: <SettingsView /> },

      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },

      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
