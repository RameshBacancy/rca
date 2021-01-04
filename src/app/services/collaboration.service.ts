import { map } from 'rxjs/operators';
import { RequestServiceBase } from './request-service-base';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-collaboration.json';


@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase
  ) { }

  // profile update request
  profileUpdate() {

  }

  // Activity Upgrade Request
  activityUpgradeRequest() {

  }

  // 
  renewalUpgradeRequest() {

  }

  getCollaborationData(): Observable<any> {
    return this.reqHttp.httpGet('collaborations-status').pipe(map(res => res.data.collaborationData));
  }




}
