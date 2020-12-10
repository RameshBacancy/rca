import { LayoutModule } from './../../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierCollaborationRoutingModule } from './supplier-collaboration-routing.module';
import { SupplierCollaborationComponent } from './supplier-collaboration.component';


@NgModule({
  declarations: [SupplierCollaborationComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SupplierCollaborationRoutingModule,
  ]
})
export class SupplierCollaborationModule { }
