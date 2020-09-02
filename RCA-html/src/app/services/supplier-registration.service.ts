import { Injectable } from '@angular/core';
import * as data from '../../assets/JSON/supplier-registration.json';
@Injectable({
  providedIn: 'root'
})
export class SupplierRegistrationService {

  constructor() { }
  
  getdata(){
      return data.details;
  }
}