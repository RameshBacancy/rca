import { EndPoint } from './../../../../app.constants';
import { LocalRegisterStep } from '../../../../enum/register-step.enum';
import { SpinnerService } from './../../../../services/spinner.service';
import { AlertService } from './../../../../services/alert.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TenderService } from 'src/app/services/tender.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplierEnum } from '../../../../enum/supplier.enum';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit, OnDestroy {

  participated: boolean;
  regretReasons: string[];
  tenderData: any;
  private subscription: Subscription;
  amount = 100;
  currency = 'USD';
  supplierType: string;
  authToken: string;
  supplierEnum = SupplierEnum;
  public endPoint = EndPoint;
  endSubmissionTime: Date;
  hoursLeft: string;

  constructor(
    private tenderService: TenderService,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {

    this.tenderService.getOrClearDraftTime('get').subscribe(res => {
      if (!(res.data.tender_drafttime === null)) {
        localStorage.setItem('tenderDraftTime', res.data.tender_drafttime);
      }
    });

    // for tender draft time
    if (this.tenderService.isTenderDraftTimeComplete()) {
      this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');

      this.tenderService.getOrClearDraftTime('clear').subscribe(() => {
        localStorage.removeItem('tenderDraftTime');
      });
    }

    this.supplierType = localStorage.getItem('regType');
    this.authToken = 'Bearer ' + localStorage.getItem('authToken');
    localStorage.removeItem('documentFees');
    this.participated = true;
    this.regretReasons = ['Lack Of Resources', 'Not Interested'];
    this.loadTenderData();
  }

  // hours left
  calculateTime(): void {
    let hourDiff = this.endSubmissionTime.getTime() - new Date().getTime(); //in ms
    // let secDiff = hourDiff / 1000; //in s  
    let minDiff = hourDiff / 60 / 1000; //in minutes
    let hDiff = hourDiff / 3600 / 1000; //in hours  
    this.hoursLeft = Math.floor(hDiff) + ':' + Math.floor(minDiff - 60 * Math.floor(hDiff));
    setInterval(() => {
      hourDiff = this.endSubmissionTime.getTime() - new Date().getTime();
      minDiff = hourDiff / 60 / 1000;
      hDiff = hourDiff / 3600 / 1000;
      this.hoursLeft = Math.floor(hDiff) + ':' + Math.floor(minDiff - 60 * Math.floor(hDiff));
    }, 60000);
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderData().
      pipe(map(res => res.generalTenderDetails)).
      subscribe(res => {
        this.tenderData = res;
        this.endSubmissionTime = new Date(this.tenderData.tenderProgram.tenderSubmissionDate);
        this.calculateTime();
      });
  }

  changeParticipationStatus(status): void {
    this.participated = status;
    this.tenderData.tenderParticipate.participate = status ? 'yes' : 'no';
  }

  submitOrSaveDraft(type: string): void {
    const data: any = {
      generalTenderDetail: {
        participate: this.tenderData.tenderParticipate.participate,
        tenderDocumentFee: this.tenderData.tenderFees.tenderDocumentFee,
        paymentMode: this.tenderData.tenderFees.paymentMode,
        tenderNo: localStorage.getItem('tenderNo'),
      },
      tenderDraftTime: localStorage.getItem('tenderDraftTime') || new Date()
    };
    if (this.tenderData.tenderParticipate.participate === 'yes') {
      data.generalTenderDetail.siteVisit = this.tenderData.tenderParticipate.siteVisitRequired;
    } else {
      data.generalTenderDetail.regretReason = this.tenderData.tenderParticipate.regretReason;
    }

    // setTenderDraftTime pass if it value is null
    this.tenderService.tenderSubmit(data).subscribe(res => {
      if (type === 'saveAsDraft') {
        this.router.navigateByUrl('e-tendering/tender-dashboard/current-tenders');
      }

      if (type === 'next') {
        this.router.navigateByUrl('/e-tendering/general-tender-details/tender-fees');
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
