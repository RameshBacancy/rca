import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent
  }
];

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TransactionComponent
  ]
})
export class TransactionModule { }
