import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingSidebarComponent } from './landing-sidebar/landing-sidebar.component';

@NgModule({
  declarations: [
    LandingComponent,
    LandingHeaderComponent,
    LandingSidebarComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
  ]
})
export class LandingModule { }
