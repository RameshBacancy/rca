import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRegistrationProcessComponent } from './supplier-registration-process.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { LocalRegistrationComponent } from './local-registration/local-registration.component';
import { IndividualRegistrationComponent } from './individual-registration/individual-registration.component';
import { InternationalRegistrationComponent } from './international-registration/international-registration.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import {   MatProgressBarModule } from '@angular/material/progress-bar';
import {   MatButtonModule } from '@angular/material/button';
import {   MatCardModule } from '@angular/material/card';
import {   MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: SupplierRegistrationProcessComponent,
  }
];

@NgModule({
  declarations: [
    SupplierRegistrationProcessComponent,
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    LocalRegistrationComponent,
    IndividualRegistrationComponent,
    InternationalRegistrationComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatTabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export class SupplierRegistrationProcessModule { }
