import { EndPoint } from './../../../app.constants';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierEnum } from '../../../enum/supplier.enum';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  paymentComplete: boolean;
  amount = 100;
  currency = 'USD';
  supplierType: string;
  authToken: string;
  supplierEnum = SupplierEnum;
  public endPoint = EndPoint;

  constructor(private router: Router, private modelService: NgbModal, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.modelService.dismissAll();
    this.supplierType = localStorage.getItem('regType');
    this.authToken = 'Bearer ' + localStorage.getItem('authToken');

    if (localStorage.getItem('RegStatus') !== 'finish') {
      this.router.navigate(['/landing/supplier-registration/dashboard']);
    }
  }
  ngAfterViewInit() {
    if (localStorage.getItem('completePayment') === 'true') {
      this.move(2);
    }
  }

  payment() {
    localStorage.setItem('paymentStep', 'true');
    if (localStorage.getItem('paymentStep')) {
      this.router.navigate(['/landing/supplier-registration/payment']);
    }
  }

  internationalPayment() {
    const supplierType = localStorage.getItem('regType');
    if (supplierType === 'international') {
      this.paymentService.internationalPayment(this.amount, this.currency);
    } else {
      this.payment();
    }
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  Cancel() {
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }
}
