import { SpinnerService } from './../../../services/spinner.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/services/tender.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tender-addendums',
  templateUrl: './tender-addendums.component.html',
  styleUrls: ['./tender-addendums.component.scss']
})
export class TenderAddendumsComponent implements OnInit {
  selected = new FormControl(0);
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
  tenderAddendum: any;

  constructor(
    private tenderService: TenderService,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    // for tender draft time
    if (this.tenderService.isTenderDraftTimeComplete()) {
      this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
      // call draft time eared api
      this.spinnerService.openSpinner();
      setTimeout(() => {
        localStorage.setItem('tenderDraftTime', '');
        this.spinnerService.closeSpinner();
      }, 1000);
    }

    this.loadTenderAddendum();
    this.itemData = this.tenderService.getItemData();
    this.revisionNoChange();
    this.contractData = this.tenderService.getContractData();
  }

  private loadTenderAddendum(): void {
    this.tenderService.getTenderData().pipe(map(res => res.tenderAddendum)).subscribe(res => {
      this.tenderAddendum = res;
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

  submitOrSaveDraft(step: string): void {
    const data = {
      tenderAddendum: {
        tenderNo: localStorage.getItem('tenderNo'),
        gatePass: this.tenderAddendum.siteVisit.gatePass,
        extensionRemark: this.tenderAddendum.extensions.extensionRemarks,
        revisionNo: this.revisionNo
      },
      tenderDraftTime: localStorage.getItem('tenderDraftTime') || new Date()
    };
    this.tenderService.tenderSubmit(data).subscribe(res => {
      if (step === 'saveAsDraft') {
        this.router.navigateByUrl('e-tendering/tender-dashboard/current-tenders');
      } else {
        this.router.navigateByUrl('/e-tendering/submit-tender-bids');
      }
    });
  }

  public clear(step: string): void {
    switch (step) {
      case 'siteVisit':
        this.tenderAddendum.siteVisit.gatePass = true;
        break;
      case 'extension':
        this.tenderAddendum.extensions.extensionRemarks = '';
        break;
      case 'supplyLines':
        break;
      case 'serviceLines':
        break;
      case 'contractBOQ':
        break;
    }
  }
}
