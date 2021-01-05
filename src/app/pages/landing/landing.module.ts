import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LayoutModule } from "../layout/layout.module"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalLoginComponent } from './international-login/international-login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowToRegisterComponent } from './how-to-register/how-to-register.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    InternationalLoginComponent,
    AboutUsComponent,
    HowToRegisterComponent,
  ],
  exports: [
    LayoutModule
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LandingModule { }
