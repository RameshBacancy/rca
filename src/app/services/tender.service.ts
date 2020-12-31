import { map } from 'rxjs/operators';
import { TenderDetail, GeneralTenderDetails } from './../models/tender.model';
import { Observable, pipe } from 'rxjs';
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

  getTender(): Observable<any> {
    return this.http.get('/assets/JSON/tender-info.json').pipe(map((res: any) => {
      if (res.tenderInfo) {
        const civilReg = localStorage.getItem('civilReg');
        const regType = localStorage.getItem('regType');
        const email = localStorage.getItem('email');
        if (regType === 'local' || regType === 'individual') {
          return res.tenderInfo.filter(tender => tender.civilReg === +civilReg && tender.regType === regType);
        }
        if (regType === 'international') {
          return res.tenderInfo.filter(tender => tender.email === email && tender.regType === regType);
        }
      }
    }));
  }



}
