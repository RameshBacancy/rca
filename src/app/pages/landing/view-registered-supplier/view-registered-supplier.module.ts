import { SharedModule } from '../../../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRegisteredSupplierComponent } from './view-registered-supplier.component';
import { InternationalViewComponent } from './international-view/international-view.component';
import { IndividualViewComponent } from './individual-view/individual-view.component';
import { LocalViewComponent } from './local-view/local-view.component';


const routes: Routes = [
  {
    path: '',
    component: ViewRegisteredSupplierComponent
  }
];

@NgModule({
  declarations: [
    ViewRegisteredSupplierComponent,
    InternationalViewComponent,
    IndividualViewComponent,
    LocalViewComponent,
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
    SharedModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewRegisteredSupplierModule { }
