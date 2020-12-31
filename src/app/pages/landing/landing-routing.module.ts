import { TenderGuard } from './../../guard/tender.guard';
import { SessionGuard } from './../../guard/session.guard';
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
    path: '',
    component: LandingComponent,
    canActivate: [ProtectGuard],
    children: [
      {
        path: 'supplier-registration',
        children: [
          {
            path: '',
            redirectTo: '/landing/supplier-registration/dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'registration',
            loadChildren: () =>
              import('./supplier-registration-process/supplier-registration-process.module').then(m => m.SupplierRegistrationProcessModule),
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'transaction',
            loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'about-us',
            component: AboutUsComponent,
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'how-to-register',
            component: HowToRegisterComponent,
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'payment',
            component: PaymentComponent,
            canActivate: [AuthGuard, SessionGuard]
          },
          {
            path: 'login',
            component: InternationalLoginComponent,
          }
        ]
      },
      {
        path: 'view-supplier',
        loadChildren: () => import('./view-registered-supplier/view-registered-supplier.module')
          .then(m => m.ViewRegisteredSupplierModule),
        canActivate: [TenderGuard]
      },
      {
        path: 'supplier-collaboration',
        loadChildren: () => import('./supplier-collaboration/supplier-collaboration.module').then(m => m.SupplierCollaborationModule)
      },
      // {
      //   path: 'supplier-performance',
      //   loadChildren: () => import('./supplier-performance/supplier-performance.module').then(m => m.SupplierPerformanceModule)
      // },

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
