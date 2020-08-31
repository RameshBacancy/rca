import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alertMessageSubj = new BehaviorSubject<string>(null);
  public alertTypeSubj = new BehaviorSubject<string>(null);
  private timeoutOption: number;
  constructor() { }

  /**
   * Gets Alert Message observable
   */
  public getAlertObs(): Observable<string> {
    return this.alertMessageSubj.asObservable();
  }

  /**
   * Gets Alert Type observable
   */
  public getAlertTypeObs(): Observable<string> {
    return this.alertTypeSubj.asObservable();
  }

  /**
   * set the Success Message
   */
  public pushSuccess(message: string) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('success');
    this.startTimer();
  }

  /**
   * set the Warning Message
   */
  public pushWarning(message: string) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('warning');
    this.startTimer();
  }

  /**
  * set the Error Message
  */
  public pushError(message: string) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('danger');
    this.startTimer();
  }

  /**
  * start the timer after alert will display
  */
  private startTimer() {
    this.timeoutOption = window.setTimeout(() => {
      this.stopTimer();
    }, 4000);
  }

  /**
  * stop the timer when user click on close button or complete the timer
  */
  public stopTimer() {
    clearTimeout(this.timeoutOption);
    this.setDefaultValue();
  }

  /**
  * set the default value to the variable
  */
  private setDefaultValue() {
    this.alertMessageSubj.next(null);
    this.alertTypeSubj.next(null);
  }
}
