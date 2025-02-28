import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthCallbackComponent} from './pages/auth-callback/auth-callback.component';
import {IndexComponent} from './pages/index/index.component';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import {SettingComponent} from './pages/setting/setting.component';
import {DatabaseComponent} from './pages/database/database.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CreateComponent as NewPhraseComponent} from './pages/database/create/create.component';
import {EditComponent} from './pages/database/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard], // Only logged-in users can access this route
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'database',
        children: [
          {
            path: '',
            component: DatabaseComponent,
          },
          {
            path: 'create',
            component: NewPhraseComponent,
          },
          {
            path: 'edit/:id',
            component: EditComponent,
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard], // Only guests can access this route
  },
  {
    path: '**',
    redirectTo: '/login', // Redirect unknown routes to login
  },

];
