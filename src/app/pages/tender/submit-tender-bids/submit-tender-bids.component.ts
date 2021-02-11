import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-submit-tender-bids',
  templateUrl: './submit-tender-bids.component.html',
  styleUrls: ['./submit-tender-bids.component.scss']
})
export class SubmitTenderBidsComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  selected = new FormControl(0);
  revisionNoArray = [1, 2, 3];
  revisionNo = 2;
  itemData: any[];
  filterItemData: any[];
  contractData: any[];
  selectedContract: any;
  selectedContractIndex: number;
  tenderBidsDetails: any;
  files: any[];
  uploadData: any;
  filesList: any = [];
  closeResult: string;

  constructor(
    private tenderService: TenderService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.loadTenderAddendum();
    this.itemData = this.tenderService.getItemData();
    this.revisionNoChange();
    this.contractData = this.tenderService.getContractData();
  }

  private loadTenderAddendum(): void {
    this.tenderService.getTenderData().pipe(map(res => res.submitTenderBids)).subscribe(res => {
     this.tenderBidsDetails = res;
    });
  }

  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }
  newStep() {
    this.selected.setValue(0);
  }
  preStep(num) {
    this.selected.setValue(num);
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

  private upload(flag) {
    this.fileInput.nativeElement.value = '';
    this.files.forEach(file => {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if( flag == false){
      this.filesList.push(file.data);
    }
    });
  }

  onClick() {

    const fileInput = this.fileInput.nativeElement;
    var flag = false;
    fileInput.onchange = () => {
      for (let index = 0; index < fileInput.files.length; index++) {
        const file = fileInput.files[index];
        this.filesList.filter(f => {
          if (f.name.toString() == file.name.toString()) {
            alert('already have similar name file.');
            flag = true;
          }
        });
        if (flag == false) {
        this.files = [];
        this.files.push({ data: file, inProgress: false, progress: 0 });
        }
      }
      this.upload(flag);
    };
    fileInput.click();
  }

  openFile(content, data) {
    this.uploadData = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {});
  }

  deleteFile(file) {
    if (confirm('Do you want to delete ' + file.name + '?')) {
      this.filesList.map((d, i) => {
        if (d.lastModified == file.lastModified) {
          this.filesList.splice(i, 1);
        }
      });
    }
  }
}
