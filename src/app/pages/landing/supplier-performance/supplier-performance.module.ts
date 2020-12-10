import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierPerformanceRoutingModule } from './supplier-performance-routing.module';
import { SupplierPerformanceComponent } from './supplier-performance.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [SupplierPerformanceComponent],
  imports: [
    CommonModule,
    SupplierPerformanceRoutingModule,
    MatStepperModule,
    MatTabsModule,
  ]
})
export class SupplierPerformanceModule { }
