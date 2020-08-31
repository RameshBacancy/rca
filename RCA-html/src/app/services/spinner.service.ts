import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public spinnerOpenSubj = new BehaviorSubject<boolean>(false);

  constructor() { }

  /**
   * Gets spinner observable
   */
  public getSpinnerObs(): Observable<boolean> {
    return this.spinnerOpenSubj.asObservable();
  }

  /**
   * Opens spinner
   */
  public openSpinner() {
    this.spinnerOpenSubj.next(true);
  }

  /**
   * Close spinner
   */
  public closeSpinner() {
    this.spinnerOpenSubj.next(false);
  }
}
