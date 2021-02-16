import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestServiceBase } from './request-service-base';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(
    private router: Router,
    private reqHttp: RequestServiceBase
  ) { }

  url = environment.API_BASE_URL;


  addCMS(page, title, data): Observable<any> {
    return this.reqHttp.httpPost('cms', {page: page, title: title, description: data});
  }

  getCMS(): Observable<any> {
      return this.reqHttp.httpGet('cms');

  }

  updateCMS(page, title, data, id): Observable<any> {
    return this.reqHttp.httpPost('cms/' + id, {page: page, title: title, description: data, _method: 'PATCH'});
  }

  deleteCMS(id): Observable<any> {
    return this.reqHttp.httpDelete('cms/' + id);
  }
}
