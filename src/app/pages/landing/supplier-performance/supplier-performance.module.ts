import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierPerformanceRoutingModule } from './supplier-performance-routing.module';
import { SupplierPerformanceComponent } from './supplier-performance.component';


@NgModule({
  declarations: [SupplierPerformanceComponent],
  imports: [
    CommonModule,
    SupplierPerformanceRoutingModule
  ]
})
export class SupplierPerformanceModule { }
