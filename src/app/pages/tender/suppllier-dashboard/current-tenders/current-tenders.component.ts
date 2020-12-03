import { TenderService } from './../../../../services/tender.service';
import { TenderDetail } from './../../../../models/tender.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-tenders',
  templateUrl: './current-tenders.component.html',
  styleUrls: ['./current-tenders.component.scss']
})
export class CurrentTendersComponent implements OnInit {
  newTender: TenderDetail[];

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.tenderService.getCurrentTender().subscribe((data: TenderDetail[]) => {
      this.newTender = data;
    });
  }
}
