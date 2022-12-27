import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from '../../pages/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { RegisterComponent } from '../../pages/register/register.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    SharedModule
  ]
})
export class AuthLayoutModule { }
