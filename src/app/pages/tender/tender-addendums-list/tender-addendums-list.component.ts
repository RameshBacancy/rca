import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenderDetail } from 'src/app/models/tender.model';
import { TenderService } from 'src/app/services/tender.service';
import { FilterPipe } from 'src/app/shared/pipe/searchEmployee.pipe';

@Component({
  selector: 'app-tender-addendums-list',
  templateUrl: './tender-addendums-list.component.html',
  styleUrls: ['./tender-addendums-list.component.scss']
})
export class TenderAddendumsListComponent implements OnInit {

  @Input('searchText') searchText: any;
  tenders: TenderDetail[];
  filterTenders: TenderDetail[];
  tenderStatus: { text: string, value: string }[];
  status: string;
  constructor(
    private tenderService: TenderService,
    private searchPipe: FilterPipe,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tenderStatus = [
      { text: 'Open', value: 'open' },
      { text: 'Submitted', value: 'submitted' },
      { text: 'Awarded', value: 'awarded' },
      { text: 'Rejected', value: 'rejected' }
    ];

    this.status = this.aRoute.snapshot.queryParams.status || 'open';

    this.tenderService.getTender().subscribe((data: any) => {
      if (data && data[0].tenders) {
        this.tenders = data[0].tenders;
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'open');
      } else {
        this.callDefaultTender();
      }
    });

  }

  private callDefaultTender(): void {
    this.tenderService.getCurrentTender().subscribe((data: TenderDetail[]) => {
      this.tenders = data;
    });
  }
  
}
