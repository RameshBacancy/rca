import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: 'supplier-registration',
    component: LandingComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path:'registration',
        loadChildren: () => import('./detailed-registration/detailed-registration.module').then(m => m.DetailedRegistrationModule),
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
