import { EndPoint } from './../app.constants';
import { RequestServiceBase } from './request-service-base';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public endPoint = EndPoint;

  constructor(
    private http: HttpClient
  ) { }

  internationalPayment(amount: number, currency: string) {
    const token = 'Bearer ' + localStorage.getItem('authToken');
    const url =
      `http://ec2-3-16-154-54.us-east-2.compute.amazonaws.com/backend/public/payment-form?amount=${amount}&currency=${currency}&Authorization=${token}`;
    location.assign(url);
  }

  getPaymentData(): Observable<any> {
    return this.http.get(EndPoint.getPaymentData);
  }

}
