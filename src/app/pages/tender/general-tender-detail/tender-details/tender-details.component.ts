import { LocalRegisterStep } from './../../../../register-step.enum';
import { SpinnerService } from './../../../../services/spinner.service';
import { AlertService } from './../../../../services/alert.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TenderService } from 'src/app/services/tender.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(
    private tenderService: TenderService,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    // for tender draft time
    if (this.tenderService.isTenderDraftTimeComplete()) {
      this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
      // call draft time eared api
      this.spinnerService.openSpinner();
      setTimeout(() => {
        localStorage.setItem('tenderDraftTime', '');
        this.spinnerService.closeSpinner();
      }, 1000);
    }

    this.supplierType = localStorage.getItem('regType');
    this.authToken = 'Bearer ' + localStorage.getItem('authToken');
    localStorage.removeItem('documentFees');
    this.participated = true;
    this.regretReasons = ['Lack Of Resources', 'Not Interested'];
    this.loadTenderData();
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderData().
      pipe(map(res => res.generalTenderDetails)).
      subscribe(res => {
        this.tenderData = res;
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
