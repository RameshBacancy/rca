import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value , editor?) {
      if(editor){
          let v = value.replace(/&lt;/g,'<').replace(/&gt;/g, '>');
          return v;
      }
      else {
        let v = value.replace(/&lt;/g,'<').replace(/&gt;/g, '>');
        return this.sanitized.bypassSecurityTrustHtml(v);
      }
  }
}