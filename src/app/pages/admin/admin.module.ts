import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { LayoutModule } from '../layout/layout.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ForgetPasswordComponent } from 'src/app/authentication/forget-password/forget-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowToRegisterComponent } from './how-to-register/how-to-register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
      },
      {
        path:'dashboard',
        component : AdminDashboardComponent,
      },
      {
        path:'about-us',
        component : AboutUsComponent,
      },
      {
        path:'how-to-register',
        component : HowToRegisterComponent,
      }
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
  declarations: [AdminComponent,ChangePasswordComponent, AboutUsComponent, HowToRegisterComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
