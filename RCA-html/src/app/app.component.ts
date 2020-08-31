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
  public messageType: String;

  private _subscriptions = [];

  constructor(
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Subscribe to spinner status
    this._subscriptions.push(this.spinnerService.getSpinnerObs().subscribe(
      val => this.loading = val,
    ));
    this._subscriptions.push(this.alertService.getAlertObs().subscribe(
      message => { this.message = message; }
    ));
    this._subscriptions.push(this.alertService.getAlertTypeObs().subscribe(
      messageType => { this.messageType = messageType; }
    ));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  closeAlert() {
    this.alertService.stopTimer();
  }

}
