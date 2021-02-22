import { LocalRegisterWsdlData, LocalRegisterStep } from '../enum/register-step.enum';
import { AlertService } from './alert.service';
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
} from './../models/supplier.model';
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
  localRegisterWsdlData = LocalRegisterWsdlData;
  localRegisterStep = LocalRegisterStep;
  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase,
    private alertService: AlertService
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

  // ifsPostRequestCall(tab: string, registerData: any) {
  //   switch (tab) {
  //     case 'Ministry1':
  //       const min1Data = JsonToXML.parse('supplierMinistry1Head', registerData, { declaration: { include: false } });
  //       const xmlhttp1 = new XMLHttpRequest();
  //       xmlhttp1.open('POST', 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin1Management?wsdl', true);

  //       const sr1 =
  //         `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
  //             xmlns:crec="http://creceivesuppmin1management.managetotcintegration.webservices.ifsworld.com/">
  //             <soapenv:Header/>
  //             <soapenv:Body>
  //               <crec:cReceiveSuppMin1>
  //                 ${min1Data}
  //               </crec:cReceiveSuppMin1>
  //              </soapenv:Body>
  //           </soapenv:Envelope>`;

  //       xmlhttp1.onreadystatechange = () => {
  //         if (xmlhttp1.readyState === 4) {
  //           this.alertService.pushSuccess('status code: ' + xmlhttp1.status + ' - ' + xmlhttp1.statusText);
  //           if (xmlhttp1.status === 200) {
  //             const xml = xmlhttp1.responseXML;
  //           }
  //           console.log('xmlhttp1', xmlhttp1);
  //         }
  //       };
  //       console.log(sr1);
  //       // Send the POST request.
  //       xmlhttp1.setRequestHeader('Content-Type', 'text/xml');
  //       xmlhttp1.responseType = 'text';
  //       xmlhttp1.send(sr1);
  //       break;

  //     case 'Ministry2':
  //       const min2Data = JsonToXML.parse('supplierMinistry2Head', registerData, { declaration: { include: false } });
  //       const xmlhttp2 = new XMLHttpRequest();
  //       xmlhttp2.open('POST', 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin2Management?wsdl', true);

  //       const sr2 =
  //         `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
  //             xmlns:crec="http://creceivesuppmin2management.managetotcintegration.webservices.ifsworld.com/">
  //           <soapenv:Header/>
  //            <soapenv:Body>
  //               <crec:cReceiveSuppMin2>
  //                 ${min2Data}
  //               </crec:cReceiveSuppMin2>
  //            </soapenv:Body>
  //           </soapenv:Envelope>`;

  //       xmlhttp2.onreadystatechange = () => {
  //         if (xmlhttp2.readyState === 4) {
  //           this.alertService.pushSuccess('status code: ' + xmlhttp2.status + ' - ' + xmlhttp2.statusText);
  //           if (xmlhttp2.status === 200) {
  //             const xml = xmlhttp2.responseXML;
  //           }
  //           console.log('xmlhttp2', xmlhttp2);
  //         }
  //       };
  //       console.log(sr2);
  //       // Send the POST r2equest.
  //       xmlhttp2.setRequestHeader('Content-Type', 'text/xml');
  //       xmlhttp2.responseType = 'text';
  //       xmlhttp2.send(sr2);
  //       break;

  //     case 'Ministry3':
  //       const min3Data = JsonToXML.parse('supplierMinistry2Head', registerData, { declaration: { include: false } });
  //       const xmlhttp3 = new XMLHttpRequest();
  //       xmlhttp3.open('POST', 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin3Management?wsdl', true);

  //       const sr3 =
  //         `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
  //             xmlns:crec="http://creceivesuppmin3management.managetotcintegration.webservices.ifsworld.com/">
  //           <soapenv:Header/>
  //           <soapenv:Body>
  //             <crec:cReceiveSuppMin3>
  //                 ${min3Data}
  //             </crec:cReceiveSuppMin3>
  //            </soapenv:Body>
  //           </soapenv:Envelope>`;

  //       xmlhttp3.onreadystatechange = () => {
  //         if (xmlhttp3.readyState === 4) {
  //           this.alertService.pushSuccess('status code: ' + xmlhttp3.status + ' - ' + xmlhttp3.statusText);
  //           if (xmlhttp3.status === 200) {
  //             const xml = xmlhttp3.responseXML;
  //           }
  //           console.log('xmlhttp3', xmlhttp3);
  //         }
  //       };
  //       // Send the POST request.
  //       xmlhttp3.setRequestHeader('Content-Type', 'text/xml');
  //       xmlhttp3.responseType = 'text';
  //       xmlhttp3.send(sr3);
  //       break;

  //   }
  // }


  ifsPostRequestCall(tab: string, registerData: any) {
    // let jsonHead: string;
    // const dataObj = registerData;
    // let wsdlUrl: string;
    // let xmlUrl: string;
    // let crecText: string;
    // switch (tab) {
    //   case 'Ministry1':
    //     jsonHead = 'supplierMinistry1Head';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin1Management?wsdl';
    //     xmlUrl = 'http://creceivesuppmin1management.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppMin1';
    //     break;

    //   case 'Ministry2':
    //     jsonHead = 'supplierMinistry2Head';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin2Management?wsdl';
    //     xmlUrl = 'http://creceivesuppmin2management.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppMin2';
    //     break;

    //   case 'Ministry3':

    //     jsonHead = 'supplierMinistry3Head';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin3Management?wsdl';
    //     xmlUrl = 'http://creceivesuppmin3management.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppMin3';
    //     break;

    //   case 'PersonalDetails':
    //     jsonHead = 'supplierPersonalHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppPersonalManagement?wsdl';
    //     xmlUrl = 'http://creceivesupppersonalmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppPersonal';
    //     break;

    //   case 'EmployeeDetails':
    //     jsonHead = 'supplierStaffHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppStaffManagement?wsdl';
    //     xmlUrl = 'http://creceivesuppstaffmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppStaff';
    //     break;

    //   case 'ProjectDetails':
    //     jsonHead = 'supplierProjectHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppProjManagement?wsdl';
    //     xmlUrl = 'http://creceivesuppprojmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppProj';
    //     break;

    //   case 'EquipmentDetails':
    //     jsonHead = 'supplierEquipHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppEquipManagement?wsdl';
    //     xmlUrl = 'http://creceivesuppequipmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppEquip';
    //     break;

    //   case 'BankDetails':
    //     jsonHead = 'supplierCommercialHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppCommManagement?wsdl';
    //     xmlUrl = 'http://creceivesuppcommmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppComm';
    //     break;

    //   case 'SubContractDetails':
    //     jsonHead = 'supplierSubconHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppSubconManagement?wsdl';
    //     xmlUrl = 'http://creceivesuppsubconmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSuppSubcon';
    //     break;

    //   case 'GeneralInfoAddress':
    //     jsonHead = 'supplierInfoHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierInfoManagement?wsdl';
    //     xmlUrl = 'http://creceivesupplierinfomanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSupplierInfo';
    //     break;

    //   case 'GeneralInfoActivity':
    //     jsonHead = 'supplierRegHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierRegManagement?wsdl';
    //     xmlUrl = 'http://creceivesupplierregmanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSupplierReg';
    //     break;

    //   case 'communication':
    //     jsonHead = 'supplierInfoHead';
    //     wsdlUrl = 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierInfoManagement?wsdl';
    //     xmlUrl = 'http://creceivesupplierinfomanagement.managetotcintegration.webservices.ifsworld.com/';
    //     crecText = 'cReceiveSupplierInfo';
    //     break;
    // }
    // this.callXmlRequest(jsonHead, dataObj, wsdlUrl, xmlUrl, crecText);
    // const key = this.localRegisterStep[tab];
    // console.log(key);
    const xmlData = {
      jsonHead: this.localRegisterWsdlData[tab].jsonHead,
      wsdlUrl: this.localRegisterWsdlData[tab].wsdlUrl,
      xmlUrl: this.localRegisterWsdlData[tab].xmlUrl,
      crecText: this.localRegisterWsdlData[tab].crecText
    };
    this.callXmlRequest(xmlData.jsonHead, registerData, xmlData.wsdlUrl, xmlData.xmlUrl, xmlData.crecText);

  }



  callXmlRequest(jsonHead, dataObj, wsdlUrl: string, xmlUrl, crecText) {
    const minData = JsonToXML.parse(jsonHead, dataObj, { declaration: { include: false } });
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', wsdlUrl, true);

    const sr3 =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
          xmlns:crec="${xmlUrl}">
        <soapenv:Header/>
        <soapenv:Body>
          <crec:${crecText}>
              ${minData}
          </crec:${crecText}>
         </soapenv:Body>
        </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 0) {
          this.alertService.pushWarning('status code: ' + xmlhttp.status + ' - ' + xmlhttp.statusText);
        } else {
          this.alertService.pushSuccess('status code: ' + xmlhttp.status + ' - ' + xmlhttp.statusText);
        }
        if (xmlhttp.status === 200) {
          const xml = xmlhttp.responseXML;
        }
        console.log('xmlhttp', xmlhttp);
      }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'text';
    xmlhttp.send(sr3);
  }

}
