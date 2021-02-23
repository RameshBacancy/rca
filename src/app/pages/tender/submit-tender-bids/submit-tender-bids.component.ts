import { TenderStep } from './../../../enum/tender.enum';
import { SpinnerService } from './../../../services/spinner.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
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
  itemData: any;
  filterItemData = {
    supplyLine: [],
    serviceLine: []
  };
  contractData: any[];
  selectedContract: any;
  selectedContractIndex: number;
  tenderBidsDetails: any;
  files: any[];
  uploadData: any;
  filesList: any = [];
  closeResult: string;
  tenderStep = TenderStep;

  constructor(
    private tenderService: TenderService,
    private modalService: NgbModal,
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

  private upload(flag) {
    this.fileInput.nativeElement.value = '';
    this.files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file.data);
      file.inProgress = true;
      if (flag == false) {
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

  openFile(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  submitOrSaveDraft(type: string): void {
    const data = {
      submitTenderBid: {
        tenderNo: localStorage.getItem('tenderNo'),
        tenderDocument: this.filesList,
        finalTenderSubmission: this.tenderBidsDetails.finalTenderSubmissions
      },
      tenderDraftTime: localStorage.getItem('tenderDraftTime') || new Date()
    };
    this.tenderService.tenderSubmit(data).subscribe(res => {
      if (type === 'saveAsDraft') {
        this.router.navigateByUrl('e-tendering/tender-dashboard/current-tenders');
      } else {
        this.router.navigateByUrl('/landing/supplier-registration/dashboard');
      }
    });
  }

  public clear(step: string): void {
    switch (step) {
      case this.tenderStep.TENDER_DOCUMENT_SUBMISSION:
        this.filesList = [];
        break;
      case this.tenderStep.FINAL_TENDER_SUBMISSION:
        this.tenderBidsDetails.finalTenderSubmissions = this.tenderBidsDetails.finalTenderSubmissions.map(item => {
          item.checkBox = true;
          item.qualifications = '';
          return item;
        });
        break;
      default:
        break;
    }
  }
}
