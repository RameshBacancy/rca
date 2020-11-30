import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('paymentStep') != 'true') {
      this.router.navigate(['/landing/supplier-registration/dashboard']);
    }
  }

  proceed() {
    localStorage.setItem('paymentStep','Done');
    this.router.navigate(['/landing/supplier-registration/transaction']);
  }
}
