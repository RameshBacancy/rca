import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ProtectGuard } from 'src/app/guard/protect.guard';

const routes: Routes = [
  {
    path: 'supplier-registration',
    component: LandingComponent,
    // canActivate: [ProtectGuard],
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path:'registration',
        loadChildren: () => import('./supplier-registration-process/supplier-registration-process.module').then(m => m.SupplierRegistrationProcessModule),
      },
      {
        path:'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
