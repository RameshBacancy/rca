import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { LandingHeaderComponent } from '../pages/landing/landing-header/landing-header.component';
import { LandingModule } from '../pages/landing/landing.module';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login' },
  // { path: 'auth/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SupplierRegisterComponent}
];

@NgModule({
  declarations: [LoginComponent, SupplierRegisterComponent],
  imports: [
    CommonModule,
    LandingModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ]
})
export class AuthenticationModule { }
