import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LayoutModule } from "../layout/layout.module"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalLoginComponent } from './international-login/international-login.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    LandingComponent,
    InternationalLoginComponent,
    AboutUsComponent,
  ],
  exports: [
    LayoutModule
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LandingModule { }
