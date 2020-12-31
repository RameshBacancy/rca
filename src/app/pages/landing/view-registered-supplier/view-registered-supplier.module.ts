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
    RouterModule.forChild(routes)
  ]
})
export class ViewRegisteredSupplierModule { }
