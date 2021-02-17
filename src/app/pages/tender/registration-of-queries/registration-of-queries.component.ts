import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TenderService } from 'src/app/services/tender.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-of-queries',
  templateUrl: './registration-of-queries.component.html',
  styleUrls: ['./registration-of-queries.component.scss']
})
export class RegistrationOfQueriesComponent implements OnInit, OnDestroy {

  @ViewChild('selectionModel', { static: false }) selectionModel: ElementRef;
  selected = new FormControl(0);
  weekList: string[];
  revisionNoArray = [1, 2, 3];
  revisionNo = 2;
  itemData: any;
  filterItemData = {
    supplyLine: [],
    serviceLine: []
  };
  contractData: any[];
  selectedContract: any;
  selectedContractIndex: number;
  tenderData: any;
  subscription: Subscription;

  constructor(
    private tenderService: TenderService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.weekList = [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4'
    ];
    this.itemData = this.tenderService.getItemData();
    this.revisionNoChange();
    this.contractData = this.tenderService.getContractData();
    this.loadTenderData();
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderData().pipe(map(res => res.registrationOfQueries))
      .subscribe(res => {
        this.tenderData = res;
      });
  }

  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }

  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }


  revisionNoChange() {
    this.filterItemData.supplyLine = this.itemData.supplyLine.filter(item => item.revisionNo === this.revisionNo);
    this.filterItemData.serviceLine = this.itemData.serviceLine.filter(item => item.revisionNo === this.revisionNo);
  }

  contractExpand(contractData: any, index: number) {
    if (this.selectedContractIndex === index) {
      this.selectedContractIndex = null;
      this.selectedContract = null;
    } else {
      this.selectedContract = contractData.items;
      this.selectedContractIndex = index;
    }
  }

  open() {
    this.modalService.open(this.selectionModel, {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basis-title'
    }).result.then(() => { });
  }

  submitTenderBids() {
    this.router.navigateByUrl('/e-tendering/submit-tender-bids');
  }

  waitAddendums() {
    this.router.navigateByUrl('/e-tendering/tender-addendums');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  submitOrSaveDraft(type: string): void {
    const supplyLines: any[] = [];
    const serviceLines: any[] = [];
    this.filterItemData.supplyLine.forEach(element => {
      supplyLines.push({
        queries: element.queries,
        lineNo: element.lineNo
      });
    });
    this.filterItemData.serviceLine.forEach(element => {
      serviceLines.push({
        queries: element.queries,
        lineNo: element.lineNo
      });
    });
    const data = {
      tenderQueries: {
        tenderNo: localStorage.getItem('tenderNo'),
        siteVisit: this.tenderData.tenderSiteVisit.requestForSiteVisit,
        reqSubmissionDate: this.tenderData.tenderExtension.extensionRequestDate,
        reasonOfExtension: this.tenderData.tenderExtension.reasonForExtension,
        revisionNo: this.revisionNo,
        technicalInquiry: {
          supplyLine: supplyLines,
          serviceLine: serviceLines
        }
      }
    };
    this.tenderService.tenderSubmit(data).subscribe(res => {
      if (type === 'saveAsDraft') {
        this.router.navigateByUrl('e-tendering/tender-dashboard/current-tenders');
      } else {
        this.open();
      }
    });
  }

  public clear(step: string): void {
    switch (step) {
      case 'siteVisit':
        this.tenderData.tenderSiteVisit.requestForSiteVisit = true;
        break;
      case 'extension':
        this.tenderData.tenderExtension.extensionRequestDate = '';
        this.tenderData.tenderExtension.reasonForExtension = '';
        break;
      case 'supplyLines':
        this.filterItemData.supplyLine = this.filterItemData.supplyLine.map(item => {
          item.queries = '';
          return item;
        });
        break;
      case 'serviceLines':
        this.filterItemData.serviceLine = this.filterItemData.serviceLine.map(item => {
          item.queries = '';
          return item;
        });
        break; 
      case 'contractBOQ':
        break;  
    }
  }
}
