import { ActivatedRoute } from '@angular/router';
import { TenderService } from './../../../../services/tender.service';
import { TenderDetail } from './../../../../models/tender.model';
import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../shared/pipe/searchEmployee.pipe';

@Component({
  selector: 'app-current-tenders',
  templateUrl: './current-tenders.component.html',
  styleUrls: ['./current-tenders.component.scss']
})
export class CurrentTendersComponent implements OnInit {

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
        this.filterTender(this.status);
      } else {
        this.callDefaultTender();
      }
    });



    // this.tenderService.getTender().subscribe(data => {
    //   data.tenderInfo.map( tender => {
    //     if(tender.regType == localStorage.getItem('regType') && tender.civilReg == localStorage.getItem('civilReg')){
    //       this.newTender = tender.tenders;
    //     }
    //   });
    // });
  }

  private callDefaultTender(): void {
    this.tenderService.getCurrentTender().subscribe((data: TenderDetail[]) => {
      this.tenders = data;
    });
  }

  public filterTender(status: string): void {
    this.status = status;
    switch (status) {
      case 'open':
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'open');
        break;
      case 'submitted':
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'submitted');
        break;
      case 'awarded':
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'awarded');
        break;
      case 'rejected':
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'rejected');
        break;
      default:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === 'open');
        break;
    }
  }

  selectTender(tenderNo: string): void {
    localStorage.setItem('tenderNo', tenderNo);
  }
}
