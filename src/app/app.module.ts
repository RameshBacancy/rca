import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingHeaderComponent } from './pages/layout/landing-header/landing-header.component';
import { LandingModule } from './pages/landing/landing.module';
import { LayoutModule } from './pages/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    LandingModule,
    LayoutModule
    // LandingHeaderComponent
  ],
  exports: [
    LandingModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
