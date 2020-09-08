import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRegistrationProcessComponent } from './supplier-registration-process.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: SupplierRegistrationProcessComponent,
  }
];

@NgModule({
  declarations: [SupplierRegistrationProcessComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SupplierRegistrationProcessModule { }
