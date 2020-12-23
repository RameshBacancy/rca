import { HttpClient } from '@angular/common/http';
import { GeneralInfoStepInd, PersonalDetailsStepInter, CommunicationDetailsStep, EmployeDetails } from './../models/supplier.modal';
import { RequestServiceBase } from './request-service-base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierInternationalRegisterService {

  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase
  ) { }

  getGeneralInfoStep(): Observable<GeneralInfoStepInd> {
    return this.reqHttp.httpGet('get-general-data')
      .pipe(map(res => res.data.generalInfoStep), shareReplay());
  }

  getPersonalInfoStep(): Observable<PersonalDetailsStepInter> {
    this.getCommunicationInfoStep();
    return this.reqHttp.httpGet('get-personal-data')
      .pipe(map(res => res.data.personalDetailsStep), shareReplay());
  }

  getCommunicationInfoStep(): Observable<CommunicationDetailsStep> {
    return this.reqHttp.httpGet('get-communicationOther-data')
      .pipe(map(res => res.data.communicationDetailsStep), shareReplay());
  }

  getEmployeeInfoStep() {
    return this.reqHttp.httpGet('get-employee-data')
      .pipe(map(res => res.data.employeeDetailsStep.employeeDetails));
  }

  getCommercialInfoStep(): Observable<any> {
    return this.reqHttp.httpGet('get-commercial-data')
    .pipe(map(res => res.data.commercialInfoStep), shareReplay());
  }
}
