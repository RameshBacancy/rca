import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './searchEmployee.pipe';
import { SortByPipe } from './sortBy.pipe';
import { ClickOutsideDirective } from '../directives/click-outside.directive';


@NgModule({
  declarations: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByPipe,
    ClickOutsideDirective,
    FilterPipe,
  ]
})
export class PipeModule { }
