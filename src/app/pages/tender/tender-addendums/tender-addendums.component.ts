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
  itemData: any[];
  filterItemData: any[];
  contractData: any[];
  selectedContract: any;
  selectedContractIndex: number;
  tenderAddendum: any;

  constructor(
    private tenderService: TenderService
  ) { }

  ngOnInit(): void {
    this.loadTenderAddendum()
    this.itemData = this.tenderService.getItemData();
    this.revisionNoChange();
    this.contractData = this.tenderService.getContractData();
  }

  private loadTenderAddendum(): void {
    this.tenderService.getTenderDataObs().pipe(map(res => res.tenderAddendum)).subscribe(res => {
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
}
