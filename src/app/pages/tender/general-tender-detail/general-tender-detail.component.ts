import { TenderService } from 'src/app/services/tender.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-tender-detail',
  templateUrl: './general-tender-detail.component.html',
  styleUrls: ['./general-tender-detail.component.scss']
})
export class GeneralTenderDetailComponent implements OnInit {


  constructor(private tenderService: TenderService) {
    this.tenderService.getTenderData();
  }

  ngOnInit(): void {
  }

}
