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
  public pushSuccess(message: string, time?: number) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('success');
    this.startTimer(time);
  }

  /**
   * set the Warning Message
   */
  public pushWarning(message: string, time?: number) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('warning');
    this.startTimer(time);
  }

  /**
   * set the Error Message
   */
  public pushError(message: string, time?: number) {
    this.stopTimer();
    this.alertMessageSubj.next(message);
    this.alertTypeSubj.next('danger');
    this.startTimer(time);
  }

  /**
   * start the timer after alert will display
   */
  private startTimer(time = 6000) {
      this.timeoutOption = window.setTimeout(() => {
        this.stopTimer();
      }, time);
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
