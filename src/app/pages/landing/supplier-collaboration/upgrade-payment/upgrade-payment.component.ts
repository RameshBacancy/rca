import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upgrade-payment',
  templateUrl: './upgrade-payment.component.html',
  styleUrls: ['./upgrade-payment.component.scss']
})
export class UpgradePaymentComponent implements OnInit {
  type: string;
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.type = this.aRoute.snapshot.params.type;
  }
  proceed() {
    // localStorage.setItem(this.type + 'PaymentStatus', 'success');
    this.alertService.pushSuccess('Payment successfully completed.', 2000);
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

  cancel() {
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

}
