import {
  GeneralInfoStepInd,
  PersonalDetailsStepInd,
  CommunicationDetailsStep
} from './../models/supplier.modal';
import { map, shareReplay } from 'rxjs/operators';
import { RequestServiceBase } from './request-service-base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierIndividualRegisterService {

  constructor(
    private reqHttp: RequestServiceBase
  ) { }

  getGeneralInfoStep(): Observable<GeneralInfoStepInd> {
    return this.reqHttp.httpGet('get-general-data')
      .pipe(map(res => res.data.generalInfoStep), shareReplay());
  }

  getPersonalInfoStep(): Observable<PersonalDetailsStepInd> {
    return this.reqHttp.httpGet('get-personal-data')
      .pipe(map(res => res.data.personalDetailsStep), shareReplay());
  }

  getCommunicationInfoStep(): Observable<CommunicationDetailsStep> {
    return this.reqHttp.httpGet('get-communicationOther-data')
      .pipe(map(res => res.data.communicationDetailsStep), shareReplay());
  }

  getCommercialInfoStep(): Observable<any> {
    return this.reqHttp.httpGet('get-commercial-data')
    .pipe(map(res => res.data.commercialInfoStep), shareReplay());
  }

  storeIndividualData(dataObj: any): Observable<any> {
    return this.reqHttp.httpPost('individual-register-draft', dataObj);
  }
}
