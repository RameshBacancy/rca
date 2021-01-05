import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderFeesComponent } from './tender-fees/tender-fees.component';
import { GeneralTenderDocumentsComponent } from './general-tender-documents/general-tender-documents.component';
import { GeneralTenderDetailComponent } from './general-tender-detail.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralTenderDetailComponent,
    children: [
      {
        path: '',
        component: TenderDetailsComponent
      },
      {
        path: 'tender-fees',
        component: TenderFeesComponent
      },
      {
        path: 'tender-documents',
        component: GeneralTenderDocumentsComponent
      },
    ]
  }

];

@NgModule({
  declarations: [
    TenderDetailsComponent,
    GeneralTenderDetailComponent,
    TenderFeesComponent,
    GeneralTenderDocumentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule
  ],
  exports: [
    RouterModule
  ]
})
export class GeneralTenderDetailModule { }
