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
    private tenderService: TenderService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('documentFees');
    this.participated = true;
    this.regretReasons = ['Lack Of Resources', 'Not Interested'];
    this.loadTenderData();
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderDataObs().
      pipe(map(res => res.generalTenderDetails)).
      subscribe(res => {
        this.tenderData = res;
      });
  }

  changeParticipationStatus(status): void {
    this.participated = status;
    this.tenderData.tenderParticipate.participate = status ? 'yes' : 'no';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
