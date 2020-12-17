import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { LayoutModule } from '../layout/layout.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CmsPagesComponent } from './cms-pages/cms-pages.component';
import { RegistrationRequestComponent } from './registration-request/registration-request.component';
import { AlertMessagesComponent } from './alert-messages/alert-messages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component : AdminDashboardComponent,
      },
      {
        path: 'cms',
        component : CmsPagesComponent,
      },
      {
        path: 'suppler-register-request-info',
        component: RegistrationRequestComponent
      },
      {
        path: 'alert-messages',
        component: AlertMessagesComponent
      },
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'changepassword',
    component : ChangePasswordComponent,
  },
  { path: '**', redirectTo: '/admin/user/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AdminComponent,
    ChangePasswordComponent,
    AdminDashboardComponent,
    CmsPagesComponent,
    RegistrationRequestComponent,
    AlertMessagesComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
