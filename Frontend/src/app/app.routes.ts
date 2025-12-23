import { Routes } from '@angular/router';
import { AdminLoginComponent } from './auth/admin-login/admin-login';
import { DashboardComponent } from './dashboard/dashboard';
import { adminGuard } from './guards/admin-guard';
import { TransferComponent } from './transactions/transfer/transfer';
import { ListComponent } from './transactions/list/list';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard]
  },

  // Transaction-related routes
  { path: 'transfer', component: TransferComponent },
  { path: 'transactions', component: ListComponent }
];
