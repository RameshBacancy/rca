import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  url= environment.API_BASE_URL;


  addMessages(status, title, data): Observable<any>{
    return this.http.post<any>(this.url+'alert-message', {status: status, title: title, description: data})
  }

  getMessages(): Observable<any>{
      return this.http.get<any>(this.url+'alert-message')
    
  }

  updateMessages(status, title, data, id): Observable<any>{
    return this.http.post<any>(this.url+'alert-message/'+id, {status: status, title: title, description: data, _method: 'PATCH'})
  }

  deleteMessages(id): Observable<any>{
    return this.http.delete<any>(this.url+'alert-message/'+id);
  }
}
