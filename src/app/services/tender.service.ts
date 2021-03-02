import { AlertService } from './alert.service';
import { RequestServiceBase } from './request-service-base';
import { map, catchError } from 'rxjs/operators';
import { TenderDetail, GeneralTenderDetails } from './../models/tender.model';
import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenderService {


  constructor(
    private http: HttpClient,
    private reqHttp: RequestServiceBase,
    private alertService: AlertService
  ) { }

  getCurrentTender(): Observable<TenderDetail[]> {
    return this.http.get('./assets/JSON/tender-details.json')
      .pipe(map((res: { tender: TenderDetail[] }) => res.tender));
  }

  getGeneralTenderDetails(): Observable<GeneralTenderDetails> {
    return this.http.get('./assets/JSON/tender-details.json')
      .pipe(map((res: { generalTenderDetails: GeneralTenderDetails }) => res.generalTenderDetails));
  }

  // For current tender list show 
  getTender(): Observable<any> {
    return this.http.get('./assets/JSON/tender-info.json').pipe(map((res: any) => {
      if (res.tenderInfo) {
        const civilReg = localStorage.getItem('civilReg');
        const regType = localStorage.getItem('regType');
        const email = localStorage.getItem('internationalEmail');
        if (regType === 'local' || regType === 'individual') {
          return res.tenderInfo.filter(tender => tender.civilReg === +civilReg && tender.regType === regType);
        }
        if (regType === 'international') {
          return res.tenderInfo.filter(tender => tender.email === email && tender.regType === regType);
        }
      }
    }));
  }

  // for tender data call
  getTenderData(): Observable<any> {
    return this.http.get('./assets/JSON/tender-details.json');
  }

  // For supply and service line tab
  getItemData() {
    const data = {
      supplyLine: [
        {
          revisionNo: 1,
          partCode: 'Lorem 1',
          partCodeDescription: 'Lorem ipsum 1',
          uom: '',
          quantity: '',
          totalPrice: '',
          unitPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '1'
        },
        {
          revisionNo: 2,
          partCode: 'Lorem 2',
          partCodeDescription: 'Lorem ipsum 2',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '2'
        },
        {
          revisionNo: 3,
          partCode: 'Lorem 2',
          partCodeDescription: 'Lorem ipsum 3',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '3'
        },
        {
          revisionNo: 2,
          partCode: 'Lorem 2 b',
          partCodeDescription: 'Lorem ipsum 2 b',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '4'
        },
      ],
      serviceLine: [
        {
          revisionNo: 1,
          partCode: 'Lorem 1',
          partCodeDescription: 'Lorem ipsum 1',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '1'
        },
        {
          revisionNo: 2,
          partCode: 'Lorem 2',
          partCodeDescription: 'Lorem ipsum 2',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '2'
        },
        {
          revisionNo: 3,
          partCode: 'Lorem 2',
          partCodeDescription: 'Lorem ipsum 3',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '3'
        },
        {
          revisionNo: 2,
          partCode: 'Lorem 2 b',
          partCodeDescription: 'Lorem ipsum 2 b',
          uom: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          document: '',
          queries: '',
          response: '',
          lineNo: '4'
        },
      ],
    };
    return data;
  }

  // For contract boq
  getContractData() {
    const data = [
      {
        revisionNo: 2,
        lineName: 'Survey',
        lineDescription: 'Survey',
        contractCurrency: '',
        companyCurrency: '',
        items: [
          {
            itemName: 'Floors',
            itemDescription: 'Flooring',
            itemType: 'Material',
            uom: 'NOS',
            quantity: 6,
            itemRate: '',
            value: '',
          }
        ]
      },
      {
        revisionNo: 2,
        lineName: 'Cons',
        lineDescription: 'Construction',
        items: [
          {
            itemName: 'Floors',
            itemDescription: 'Flooring',
            itemType: 'Material',
            uom: 'NOS',
            quantity: 6,
            itemRate: '',
            value: '',
          },
          {
            itemName: 'Shift',
            itemDescription: 'Shifting',
            itemType: '',
            uom: '',
            quantity: '',
            itemRate: '',
            value: '',
          },
          {
            itemName: 'Build',
            itemDescription: 'Building',
            itemType: '',
            uom: '',
            quantity: '',
            itemRate: '',
            value: '',
          }
        ]
      }
    ];
    return data;
  }


  // tender post request
  tenderSubmit(data: any): Observable<any> {
    return this.reqHttp.httpPost('general-tender-details', data)
      .pipe(catchError((err: HttpErrorResponse) => {
        this.alertService.pushError(err.message);
        return throwError(err);
      }));
  }


  // get save draft time diff
  public isTenderDraftTimeComplete(): boolean {
    const tenderDraftTime = localStorage.getItem('tenderDraftTime') || '';

    // for below two line is for testing purpose
    // var tenderDraftTime = new Date();
    // tenderDraftTime.setDate(tenderDraftTime.getDate() - 4);

    if (!tenderDraftTime) {
      return false;
    }
    const diff = this.getTimeDiff(tenderDraftTime);
    return diff > 72 ? true : false;
  }

  private getTimeDiff(tenderDraftTime): number {
    if (!(tenderDraftTime === 'null')) {
      const startTime: any = new Date(tenderDraftTime);
      const endTime: any = new Date();
      const timeDiff = Math.floor((endTime - startTime) / 3600000);
      return timeDiff;
    } else {
      return 0;
    }
  }

  getOrClearDraftTime(type): Observable<any> {
    const tenderNo = localStorage.getItem('tenderNo');
    return this.reqHttp.httpGet('tender-drafttime?type=' + type + '&tender_id=' + tenderNo);
  }

}
