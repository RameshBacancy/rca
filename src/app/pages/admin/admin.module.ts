import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { LayoutModule } from '../layout/layout.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from 'src/app/authentication/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      
    ]
  },
  {
    path:'user',
    loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path:'changepassword',
    component : ChangePasswordComponent,
  },
  {
    path:'forgetpassword',
    component : ForgetPasswordComponent,
  },
  { path: '**', redirectTo: '/admin/user/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [AdminComponent,ChangePasswordComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
