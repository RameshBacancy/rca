import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/searchEmployee.pipe';
import { SortByPipe } from './pipe/sortBy.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SafeHtmlPipe } from './pipe/safeHtml.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { SortDirective } from './directives/sort.directive';


@NgModule({
  declarations: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe,
    SpinnerComponent,
    SortDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe,
    SpinnerComponent,
    SortDirective
  ],
  providers: [
    SafeHtmlPipe
  ]
})
export class SharedModule { }
