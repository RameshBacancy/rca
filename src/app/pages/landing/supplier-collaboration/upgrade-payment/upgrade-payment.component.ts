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
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.type = this.aRoute.snapshot.queryParams.type;
  }
  proceed() {
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

  cancel() {
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

}
