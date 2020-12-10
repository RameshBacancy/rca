import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderComponent } from './tender.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInformationComponent } from './suppllier-dashboard/my-information/my-information.component';
import { CurrentTendersComponent } from './suppllier-dashboard/current-tenders/current-tenders.component';
import { RegistrationOfQueriesComponent } from './registration-of-queries/registration-of-queries.component';
import { TenderAddendumsComponent } from './tender-addendums/tender-addendums.component';
import { SubmitTenderBidsComponent } from './submit-tender-bids/submit-tender-bids.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    TenderComponent,
    MyInformationComponent,
    CurrentTendersComponent,
    RegistrationOfQueriesComponent,
    TenderAddendumsComponent,
    SubmitTenderBidsComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    NgbModule,
    TenderRoutingModule,
    LayoutModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule
  ]
})
export class TenderModule { }
