import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('paymentStep') != 'true') {
      this.router.navigate(['/landing/supplier-registration/dashboard']);
    }
  }

  proceed() {
    this.userService.completeRegistrationPayment().subscribe(res => {
      localStorage.setItem('completePayment', 'true');
      // this.router.navigate(['/landing/supplier-registration/transaction']);
      this.router.navigateByUrl('/landing/supplier-registration/dashboard');
      this.userService.paymentStatus$.next(true);
    }, (error) => { console.log(error) });
  }

  cancel() {
    localStorage.setItem('paymentStep', 'false');
    this.router.navigateByUrl('/landing/supplier-registration/dashboard')
  }
}
