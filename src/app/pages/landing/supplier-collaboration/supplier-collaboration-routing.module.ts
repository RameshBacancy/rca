import { RenewalUpdateComponent } from './components/renewal-update/renewal-update.component';
import { ActivityUpdateComponent } from './components/activity-update/activity-update.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { GradeDetailComponent } from './components/grade-detail/grade-detail.component';
import { UpgradePaymentComponent } from './upgrade-payment/upgrade-payment.component';
import { SupplierCollaborationComponent } from './supplier-collaboration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SupplierCollaborationComponent,
    children: [
      {
        path: 'grade-details',
        component: GradeDetailComponent
      },
      {
        path: 'profile-update',
        component: ProfileUpdateComponent
      },
      {
        path: 'activity-upgrade',
        component: ActivityUpdateComponent
      },
      {
        path: 'renewal-upgrade',
        component: RenewalUpdateComponent
      },
      {
        path: '',
        redirectTo: '/landing/supplier-collaboration/grade-details',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'payment/:type',
    component: UpgradePaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierCollaborationRoutingModule { }
