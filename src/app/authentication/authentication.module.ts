import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { LayoutModule } from '../pages/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterationComponent } from './registeration/registeration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login' },
  // { path: 'auth/login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'supplier-registration',
    component: SupplierRegisterComponent
  },
  {
    path: '',
    redirectTo: '/auth/supplier-registration',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/supplier-registration',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SupplierRegisterComponent,
    RegisterationComponent,
    ForgetPasswordComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgOtpInputModule,
    HttpClientModule,
    TranslateModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }
