import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/searchEmployee.pipe';
import { SortByPipe } from './pipe/sortBy.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SafeHtmlPipe } from './pipe/safeHtml.pipe';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe,
    SpinnerComponent
  ],
  providers: [
    SafeHtmlPipe
  ]
})
export class SharedModule { }
