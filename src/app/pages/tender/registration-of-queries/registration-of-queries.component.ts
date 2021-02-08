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
  itemData: any[];
  filterItemData: any[];
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
    this.tenderService.getTenderData();
    this.loadTenderData();
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderDataObs().pipe(map(res => res.registrationOfQueries))
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
    this.filterItemData = this.itemData.filter(item => item.revisionNo === this.revisionNo);
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
    this.modalService.open(this.selectionModel, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => { });
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
}
