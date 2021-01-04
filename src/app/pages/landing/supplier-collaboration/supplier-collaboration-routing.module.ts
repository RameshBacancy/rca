import { UpgradePaymentComponent } from './upgrade-payment/upgrade-payment.component';
import { SupplierCollaborationComponent } from './supplier-collaboration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SupplierCollaborationComponent
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
