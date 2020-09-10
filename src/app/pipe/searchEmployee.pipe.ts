import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable({
    providedIn: 'root'
  })
export class FilterPipe implements PipeTransform {
    transform(items: any, term: string): any {
        if (!term) return items;
        if (!items) return [];

        return FilterPipe.filter(items, term);
    }

    static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {


        const toCompare = term.toLowerCase();


        return items.filter(function (item: any) {
            for (let property in item) {


                if (item[property] === null) {
                    continue;
                }

                let type = typeof item[property]
                if (item[property]) {
                    if (item[property].toString().toLowerCase().includes(toCompare)) {
                        return true;
                    }
                }


            }
            return false;
        });
    }
}


