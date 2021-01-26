import {
  BankDetailStep,
  CommunicationMethodStep,
  EmployeeDetailsStep,
  EquipmentDetailsStep,
  GeneralInfoStep,
  MinistriesData1Step,
  MinistriesData2Step,
  MinistriesData3Step,
  PersonalDetailsStep,
  ProjectDetailsStep,
  SubContractorDetailsStep
} from './../models/supplier.modal';
import { RequestServiceBase } from './request-service-base';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-registration-1.json';
import { Observable } from 'rxjs';
// import * as converter from 'xml-js';
import * as JsonToXML from 'js2xmlparser';



@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {

  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase
  ) { }

  getdata(type = 'local'): Observable<any> {
    return this.http.get('/assets/JSON/supplier-registration-1.json').pipe(map(res => {
      return res[type];
    }));
  }

  getGeneralInfoStep(): Observable<GeneralInfoStep> {
    return this.reqHttp.httpGet('get-general-data')
      .pipe(map(res => res.data.generalInfoStep), shareReplay());

    // return this.http.get('http://ec2-3-16-154-54.us-east-2.compute.amazonaws.com/backend/api/get-general-data').
    // pipe(map(res => res.data.generalInfoStep), shareReplay());
    // .subscribe(res => console.log('res >> ', res));
  }

  getPersonalInfoStep(): Observable<PersonalDetailsStep> {
    return this.reqHttp.httpGet('get-personal-data')
      .pipe(map(res => res.data.personalDetailsStep), shareReplay());
  }

  getCommunticationInfoStep(): Observable<any> {
    return this.reqHttp.httpGet('get-communication-data')
      .pipe(map(res => res.data.communicationMethodStep), shareReplay());
  }

  getBankInfoStep(): Observable<BankDetailStep> {
    return this.reqHttp.httpGet('get-bank-data')
      .pipe(map(res => res.data.bankDetailStep), shareReplay());
  }

  getEmployeeInfoStep(): Observable<EmployeeDetailsStep> {
    return this.reqHttp.httpGet('get-employee-data')
      .pipe(map(res => res.data.employeeDetailsStep), shareReplay());
  }

  getMinistriesData1Step(): Observable<MinistriesData1Step> {
    return this.reqHttp.httpGet('get-ministries-data1')
      .pipe(map(res => res.data.ministriesData1Step), shareReplay());
  }

  getMinistriesData2Step(): Observable<MinistriesData2Step> {
    return this.reqHttp.httpGet('get-ministries-data2')
      .pipe(map(res => res.data.ministriesData2Step), shareReplay());
  }

  getMinistriesData3Step(): Observable<MinistriesData3Step> {
    return this.reqHttp.httpGet('get-ministries-data3')
      .pipe(map(res => res.data.ministriesData3Step), shareReplay());
  }

  getProjectInfoStep(): Observable<ProjectDetailsStep> {
    return this.reqHttp.httpGet('get-project-data')
      .pipe(map(res => res.data.projectDetailsStep), shareReplay());
  }

  getSubContratorInfoStep(): Observable<SubContractorDetailsStep> {
    return this.reqHttp.httpGet('get-subcontractor-data')
      .pipe(map(res => res.data.subContractorDetailsStep), shareReplay());
  }

  getEquipmentInfoStep(): Observable<EquipmentDetailsStep> {
    return this.reqHttp.httpGet('get-equipment-data')
      .pipe(map(res => res.data.equipmentDetailsStep), shareReplay());
  }


  storeLocalData(dataObj: any): Observable<any> {
    return this.reqHttp.httpPost('local-register-draft', dataObj);
  }

  deleteDraftData() {
    return this.reqHttp.httpDelete('delete-draft');
  }

  singleDelete(step, id): Observable<any> {
    return this.reqHttp.httpDelete('delete-single/' + step + '/' + id);
  }

  ifsPostRequestCall(tab: string, registerData: any) {
    switch (tab) {
      case 'Ministry1':
        // console.log(registerData);
        // const min1Data =  converter.json2xml(registerData, { compact: false, spaces: 4 });
        // console.log(min1Data);
        console.log(JsonToXML.parse('supplierMinistry1Head', registerData));

        break;

      default:
        break;
    }
  }

}
