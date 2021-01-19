import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CollaborationService } from 'src/app/services/collaboration.service';

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
    private alertService: AlertService,
    private collaborationService: CollaborationService
  ) { }

  ngOnInit(): void {
    this.type = this.aRoute.snapshot.params.type;
  }
  proceed() {
    // localStorage.setItem(this.type + 'PaymentStatus', 'success');
    this.alertService.pushSuccess('Payment successfully completed.', 2000);
    let body = {};
    if (this.type === 'activity') {
      body = {
        activity: {
          status: 'paid'
        }
      };
    } else if (this.type === 'renewal') {
      body = {
        renewal: {
          status: 'paid'
        }
      };
    }
    this.collaborationService.activityUpgradeRequest(body).subscribe(res => {
      localStorage.setItem('activityStatus', 'paid');
    }, (err) => console.log(err));
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

  cancel() {
    this.router.navigateByUrl('/landing/supplier-registration/dashboard');
  }

}
