import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login' },
  // { path: 'auth/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }
