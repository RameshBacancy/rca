import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/searchEmployee.pipe';
import { SortByPipe } from './pipe/sortBy.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SafeHtmlPipe } from './pipe/safeHtml.pipe';


@NgModule({
  declarations: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
    SafeHtmlPipe
  ],
  providers: [
    SafeHtmlPipe
  ]
})
export class SharedModule { }
