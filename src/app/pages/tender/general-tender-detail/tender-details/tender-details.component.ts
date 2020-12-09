import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {

  participated: boolean;
  regretReasons: string[];

  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('documentFees');
    this.participated = true;
    this.regretReasons = ['Lack Of Resources', 'Not Interested'];
  }

  changeParticipationStatus(status): void {
    this.participated = status;
  }

}
