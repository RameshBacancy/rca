import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingSidebarComponent } from './landing-sidebar/landing-sidebar.component';



@NgModule({
  declarations: [
    LandingHeaderComponent,
    LandingSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LandingHeaderComponent,
    LandingSidebarComponent
  ]
})
export class LayoutModule { }
