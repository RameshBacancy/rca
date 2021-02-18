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
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TenderAddendumsListComponent } from './tender-addendums-list/tender-addendums-list.component';


@NgModule({
  declarations: [
    TenderComponent,
    MyInformationComponent,
    CurrentTendersComponent,
    RegistrationOfQueriesComponent,
    TenderAddendumsComponent,
    SubmitTenderBidsComponent,
    TenderAddendumsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    MatTabsModule,
    MatSlideToggleModule
  ]
})
export class TenderModule { }
