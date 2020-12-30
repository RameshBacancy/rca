import { TenderService } from './../../../../services/tender.service';
import { TenderDetail } from './../../../../models/tender.model';
import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';

@Component({
  selector: 'app-current-tenders',
  templateUrl: './current-tenders.component.html',
  styleUrls: ['./current-tenders.component.scss']
})
export class CurrentTendersComponent implements OnInit {

  @Input('searchText') searchText: any;
  newTender: TenderDetail[];

  constructor(
    private tenderService: TenderService,
    private searchPipe: FilterPipe,
    ) { }

  ngOnInit(): void {
    this.tenderService.getCurrentTender().subscribe((data: TenderDetail[]) => {
      this.newTender = data;
    });
    this.tenderService.getTender().subscribe(data => {
      data.tenderInfo.map( tender => {
        if(tender.regType == localStorage.getItem('regType') && tender.civilReg == localStorage.getItem('civilReg')){
          this.newTender = tender.tenders;
        }
      });
    });
  }
}
