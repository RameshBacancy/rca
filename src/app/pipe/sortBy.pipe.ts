import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { orderBy } from 'lodash';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'sortBy'})
@Injectable({
  providedIn: 'root'
})
export class SortByPipe implements PipeTransform {
    transform(value: any[], order = '', column: string = ''): any[] {
        if (!value || order === '' || !order) { return value; } // no array
        if (value.length <= 1) { return value; } // array with only one item
        if (!column || column === '') { 
          if(order==='asc'){return value.sort()}
          else{return value.sort().reverse();}
        } // sort 1d array
        return orderBy(value, [column], [order]);
      }
}