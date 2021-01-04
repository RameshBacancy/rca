import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-collaboration.json';


@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  constructor(
    private http: HttpClient
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

  getCollaborationData(): any {

  }


}
