import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UserGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', canActivate:[UserGuard], loadChildren: () => import('./layout/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
  { path: 'admin', canActivate:[AuthGuard], loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  { path: '', canActivate:[AuthGuard], loadChildren: () => import('./layout/user-layout/user-layout.module').then(m => m.UserLayoutModule) },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
