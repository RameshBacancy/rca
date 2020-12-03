import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderComponent } from './tender.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenTendersComponent } from './open-tenders/open-tenders.component';


@NgModule({
  declarations: [TenderComponent, OpenTendersComponent],
  imports: [
    CommonModule,
    TenderRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TenderModule { }
