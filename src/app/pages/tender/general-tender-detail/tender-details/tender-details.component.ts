import { TenderService } from 'src/app/services/tender.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {

  participated: boolean;
  regretReasons: string[];

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
  
    this.tenderService.getTenderDataObs().subscribe(res => {
      console.log('res :>> ', res);
    })
  }

  changeParticipationStatus(status): void {
    this.participated = status;
  }

}
