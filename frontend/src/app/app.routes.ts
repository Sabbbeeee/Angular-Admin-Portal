import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';

import { Admin } from './pages/admin/admin';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard',

    component: Dashboard,

    canActivate: [authGuard]
  },

  {
    path: 'admin',

    component: Admin,

    canActivate: [authGuard]
  }

];