import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderComponent } from './tender.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInformationComponent } from './suppllier-dashboard/my-information/my-information.component';
import { CurrentTendersComponent } from './suppllier-dashboard/current-tenders/current-tenders.component';
import { GeneralTenderDetailComponent } from './general-tender-detail/general-tender-detail.component';
import { RegistrationOfQueriesComponent } from './registration-of-queries/registration-of-queries.component';
import { TenderAddendumsComponent } from './tender-addendums/tender-addendums.component';
import { SubmitTenderBidsComponent } from './submit-tender-bids/submit-tender-bids.component';


@NgModule({
  declarations: [
    TenderComponent,
    MyInformationComponent,
    CurrentTendersComponent,
    GeneralTenderDetailComponent,
    RegistrationOfQueriesComponent,
    TenderAddendumsComponent,
    SubmitTenderBidsComponent
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    LayoutModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule
  ]
})
export class TenderModule { }
