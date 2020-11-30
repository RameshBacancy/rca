import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public loading = false;
  public message: string = null;
  public messageType: string;

  private subscriptions = [];

  constructor(
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Subscribe to spinner status
    this.subscriptions.push(this.spinnerService.getSpinnerObs().subscribe(
      val => this.loading = val,
    ));
    this.subscriptions.push(this.alertService.getAlertObs().subscribe(
      message => { this.message = message; }
    ));
    this.subscriptions.push(this.alertService.getAlertTypeObs().subscribe(
      messageType => { this.messageType = messageType; }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  closeAlert() {
    this.alertService.stopTimer();
  }

}
