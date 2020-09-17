import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  url= environment.API_BASE_URL;


  addCMS(page, title, data): Observable<any>{
    return this.http.post<any>(this.url+'cms', {page: page, title: title, description: data})
  }

  getCMS(page): Observable<any>{
    if(page == 'about-us'){
      return this.http.get<any>(this.url+'cms/1')
    }
  }

  updateCMS(page, title, data): Observable<any>{
    return this.http.post<any>(this.url+'cms', {page: page, title: title, description: data, _method: 'PATCH'})
  }
}
