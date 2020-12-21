import { GeneralInfoStep } from './../models/supplier.modal';
import { RequestServiceBase } from './request-service-base';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-registration-1.json';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {

  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase
  ) { }

  getdata() {
    if (localStorage.getItem('regType') === 'local') {
      return data.local;
    } else if (localStorage.getItem('regType') === 'individual') {
      return data.individual;
    } else if (localStorage.getItem('regType') === 'international') {
      return data.international;
    }
  }

  getGeneralInfoStep(): Observable<GeneralInfoStep> {
    return this.reqHttp.httpGet('get-general-data')
      .pipe(map(res => res.data.generalInfoStep), shareReplay());

    // return this.http.get('http://ec2-3-16-154-54.us-east-2.compute.amazonaws.com/backend/api/get-general-data').
    // pipe(map(res => res.data.generalInfoStep), shareReplay());
    // .subscribe(res => console.log('res >> ', res));
  }

}
