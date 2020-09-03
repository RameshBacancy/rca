import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { SupplierRegistrationService } from '../../../services/supplier-registration.service';

@Component({
  selector: 'app-supplier-registration-process',
  templateUrl: './supplier-registration-process.component.html',
  styleUrls: ['./supplier-registration-process.component.scss']
})
export class SupplierRegistrationProcessComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  
  constructor(private router: Router, private supplierData: SupplierRegistrationService) { }

  ngOnInit(): void {  
    this.formData = this.supplierData.getdata();
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

}
