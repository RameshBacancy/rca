import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingHeaderComponent } from './pages/layout/landing-header/landing-header.component';
import { LandingModule } from './pages/landing/landing.module';
import { LayoutModule } from './pages/layout/layout.module';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { BasicAuthInterceptor } from 'src/app/interceptor/basic-auth';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    // ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    LandingModule,
    LayoutModule,
    MatFormFieldModule
    // LandingHeaderComponent
  ],
  exports: [
    LandingModule,
    LayoutModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ]
})
export class AppModule { }
