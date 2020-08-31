import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedRegistrationComponent } from './detailed-registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DetailedRegistrationComponent,
  }
];

@NgModule({
  declarations: [
    DetailedRegistrationComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule.forChild(routes)
  ]
})
export class DetailedRegistrationModule { }
