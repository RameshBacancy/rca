import { TenderStatus } from './../../../../enum/tender.enum';
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

  @Input('searchText') searchText: any;  // for tender search bix
  tenders: TenderDetail[]; // for store list if ender
  filterTenders: TenderDetail[]; // filter tender for selected tender status
  // tenderStatus: { text: string, value: string }[];
  status: string;
  public tenderStatusEnum = TenderStatus;
  constructor(
    private tenderService: TenderService,
    private searchPipe: FilterPipe,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.tenderStatus = [
    //   { text: 'Open', value: 'open' },
    //   { text: 'Submitted', value: 'submitted' },
    //   { text: 'Awarded', value: 'awarded' },
    //   { text: 'Rejected', value: 'rejected' }
    // ];

    this.status = this.aRoute.snapshot.queryParams.status || this.tenderStatusEnum.OPEN;

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

  // Filter tender according to current tender selected
  public filterTender(status: string): void {
    this.status = status;
    switch (status) {
      case this.tenderStatusEnum.OPEN:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === this.tenderStatusEnum.OPEN);
        break;
      case this.tenderStatusEnum.SUBMITTED:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === this.tenderStatusEnum.SUBMITTED);
        break;
      case this.tenderStatusEnum.AWARDED:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === this.tenderStatusEnum.AWARDED);
        break;
      case this.tenderStatusEnum.REJECTED:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === this.tenderStatusEnum.REJECTED);
        break;
      default:
        this.filterTenders = this.tenders.filter(tender => tender.tenderStatus === this.tenderStatusEnum.OPEN);
        break;
    }
  }

  // Store selected tender number
  selectTender(tenderNo: string): void {
    localStorage.setItem('tenderNo', tenderNo);
  }
}
