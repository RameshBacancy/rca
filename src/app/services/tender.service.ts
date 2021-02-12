import { map } from 'rxjs/operators';
import { TenderDetail, GeneralTenderDetails } from './../models/tender.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  constructor(private http: HttpClient) { }

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
      supplyLine:  [
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
      serviceLine:  [
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


}
