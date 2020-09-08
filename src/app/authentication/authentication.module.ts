import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { LayoutModule } from '../pages/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProtectGuard } from '../guard/protect.guard';
import { RegisterationComponent } from './registeration/registeration.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login' },
  // { path: 'auth/login', component: LoginComponent },
  { 
    path: 'register', 
    component: RegisterationComponent 
  },
  {
    path: '',
    component: LoginComponent
  },
  { 
    path: 'supplierRegistration', 
    component: SupplierRegisterComponent
  }
];

@NgModule({
  declarations: [LoginComponent, SupplierRegisterComponent, RegisterationComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }
