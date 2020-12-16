import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-registration-1.json';
@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {

  constructor() { }

  getdata() {
    if (localStorage.getItem('regType') === 'local') {
      return data.local;
    } else if (localStorage.getItem('regType') === 'individual') {
      return data.individual;
    } else if (localStorage.getItem('regType') === 'international') {
      return data.international;
    }
  }
}
