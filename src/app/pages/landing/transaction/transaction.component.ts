import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private router: Router, private modelService: NgbModal, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.modelService.dismissAll();
    if (localStorage.getItem('RegStatus') != 'finish') {
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
      const url =
      `http://ec2-3-16-154-54.us-east-2.compute.amazonaws.com/backend/public/payment-form?amount=${this.amount}&currency=${this.currency}`;
      location.assign(url);
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
