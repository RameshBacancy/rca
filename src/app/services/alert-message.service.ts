import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestServiceBase } from './request-service-base';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(
    private router: Router,
    private reqHttp: RequestServiceBase
  ) { }

  url = environment.API_BASE_URL;


  addMessages(status, title, data): Observable<any> {
    return this.reqHttp.httpPost('alert-message', {status: status, title: title, description: data});
  }

  getMessages(): Observable<any> {
      return this.reqHttp.httpGet('alert-message');

  }

  updateMessages(status, title, data, id): Observable<any> {
    return this.reqHttp.httpPost('alert-message/' + id, { status: status, title: title, description: data, _method: 'PATCH'});
  }

  deleteMessages(id): Observable<any> {
    return this.reqHttp.httpDelete('alert-message/' + id);
  }
}
