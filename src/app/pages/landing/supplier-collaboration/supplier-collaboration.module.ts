import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { LayoutModule } from './../../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierCollaborationRoutingModule } from './supplier-collaboration-routing.module';
import { SupplierCollaborationComponent } from './supplier-collaboration.component';
import { MatSelectModule } from '@angular/material/select';
import { UpgradePaymentComponent } from './upgrade-payment/upgrade-payment.component';


@NgModule({
  declarations: [SupplierCollaborationComponent, UpgradePaymentComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatStepperModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierCollaborationRoutingModule,
  ]
})
export class SupplierCollaborationModule { }
