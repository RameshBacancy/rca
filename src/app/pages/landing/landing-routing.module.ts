import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ProtectGuard } from 'src/app/guard/protect.guard';
import { InternationalLoginComponent } from './international-login/international-login.component';
import { PaymentComponent } from './transaction/payment/payment.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowToRegisterComponent } from './how-to-register/how-to-register.component';

const routes: Routes = [
  {
    path: 'supplier-registration',
    component: LandingComponent,
    canActivate: [ProtectGuard],
    children:[
      {
        path: '',
        redirectTo: '/landing/supplier-registration/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'registration',
        loadChildren: () =>
             import('./supplier-registration-process/supplier-registration-process.module').then(m => m.SupplierRegistrationProcessModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'how-to-register',
        component: HowToRegisterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: InternationalLoginComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landing/supplier-registration/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/landing/supplier-registration/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
