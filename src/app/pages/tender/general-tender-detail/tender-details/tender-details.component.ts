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

  constructor(
    private tenderService: TenderService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  submitOrSaveDraft(): void {
    const data: any = {
      generalTenderDetail: {
        participate: this.tenderData.tenderParticipate.participate,
        tenderDocumentFee: this.tenderData.tenderFees.tenderDocumentFee,
        paymentMode: this.tenderData.tenderFees.paymentMode,
        tenderNo: localStorage.getItem('tenderNo')
      }
    };

    if (this.tenderData.tenderParticipate.participate === 'yes') {
      data.generalTenderDetail.siteVisit = this.tenderData.tenderParticipate.siteVisitRequired;
    } else {
      data.generalTenderDetail.regretReason = this.tenderData.tenderParticipate.regretReason;
    }

    this.tenderService.tenderSubmit(data).subscribe(res => {
      this.router.navigateByUrl('/e-tendering/general-tender-details/tender-fees');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
