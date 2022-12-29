import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { UserLayoutComponent } from './user-layout.component';

const routes: Routes = [
  { path: '', component: UserLayoutComponent,children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ] },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
