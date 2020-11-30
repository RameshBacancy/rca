import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-registration.json';
@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {

  constructor() { }

  getdata() {
    if (localStorage.getItem('regType') === 'local') {
      return data.localdetails;
    } else {
      return data.details;
    }
  }
}
