import { TenderStep } from './../../../../enum/tender.enum';
import { SpinnerService } from './../../../../services/spinner.service';
import { AlertService } from './../../../../services/alert.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralTenderDetails } from 'src/app/models/tender.model';
import { TenderService } from 'src/app/services/tender.service';
import { idText } from 'typescript';
import * as fileSave from 'file-saver';

@Component({
  selector: 'app-general-tender-documents',
  templateUrl: './general-tender-documents.component.html',
  styleUrls: ['./general-tender-documents.component.scss']
})
export class GeneralTenderDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('selectionModel', { static: false }) selectionModel: ElementRef;

  generalTenderDetail: GeneralTenderDetails;
  searchText: string;
  selected = new FormControl(0);
  selectedPage: any;
  filesList: any[];
  tenderDocuments: any[];
  closeResult: string;
  files: any[];
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
  tenderStep = TenderStep;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private tenderService: TenderService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.tenderService.getOrClearDraftTime('get').subscribe(res => {
      if (!(res.data.tender_drafttime === null)) {
        localStorage.setItem('tenderDraftTime', res.data.tender_drafttime);
      }
    });
    // for tender draft time
    if (this.tenderService.isTenderDraftTimeComplete()) {
      this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
      // call draft time eared api

      this.tenderService.getOrClearDraftTime('clear').subscribe(() => {
        localStorage.removeItem('tenderDraftTime');
      });
    }

    // if (!localStorage.getItem('documentFees')) {
    //   this.router.navigateByUrl('/e-tendering/general-tender-details');
    // }
    this.tenderService.getGeneralTenderDetails().subscribe(data => {
      this.generalTenderDetail = data;
    });
    this.tenderDocuments = [];
    this.selected.setValue(0);
    this.itemData = this.tenderService.getItemData();
    this.revisionNoChange();
    this.contractData = this.tenderService.getContractData();
    this.loadTenderData();
  }

  private loadTenderData(): void {
    this.subscription = this.tenderService.getTenderData().
      pipe(map(res => res.generalTenderDetails)).
      subscribe(res => {
        this.tenderData = res;
      });
  }

  proceed() {
    this.modalService.open(this.selectionModel, {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basis-title'
    }).result.then(() => { });
    // localStorage.removeItem('documentFees');
    // this.router.navigateByUrl('/e-tendering/registration-of-queries');
    // this.router.navigate([]);
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


  onClick() {
    const data = this.tenderDocuments;
    const fileInput = this.fileInput.nativeElement;
    let flag = false;
    fileInput.onchange = () => {
      for (let index = 0; index < fileInput.files.length; index++) {
        const file = fileInput.files[index];
        this.filesList.filter(f => {
          if (f.name.toString() === file.name.toString()) {
            alert('already have similar name file.');
            flag = true;
          }
        });
        if (flag === false) {
          this.files = [];
          this.files.push({ data: file, inProgress: false, progress: 0 });
        }
      }
      this.upload(data, flag);
    };
    fileInput.click();
  }

  openFile(content, page) {
    this.selectedPage = page;
    if (this.selectedPage === 'tenderDocuments') {
      this.filesList = [];
      this.filesList = this.tenderDocuments;
    }
    this.open(content);
  }

  open(content, address?) {

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
      if (this.selectedPage === 'tenderDocuments') {
        this.filesList = [];
        this.tenderDocuments.filter((f, i) => {
          if (f.name === file.name) {
            this.tenderDocuments.splice(i, 1);
            this.filesList = this.tenderDocuments;
          }
        });
      }
    }
  }

  callUploadService(file, data, flag) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if (this.selectedPage === 'tenderDocuments') {
      this.filesList = [];
      if (flag === false) {
        this.tenderDocuments.push(file.data);
      }
      this.filesList = this.tenderDocuments;
    }
  }

  private upload(data, flag) {
    this.fileInput.nativeElement.value = '';
    this.files.forEach(file => {
      this.callUploadService(file, data, flag);
    });
  }

  submitTenderBids() {
    this.router.navigateByUrl('/e-tendering/submit-tender-bids');
  }

  tenderQueries() {
    this.router.navigateByUrl('/e-tendering/registration-of-queries');
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

  downloadFile() {
    fileSave.saveAs("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "temp.text");
  }

  submitOrSaveDraft(type: string): void {
    const supplyLines: any[] = [];
    const serviceLines: any[] = [];
    this.filterItemData.supplyLine.forEach(element => {
      supplyLines.push({
        unitPrice: element.unitPrice,
        lineNo: element.lineNo
      });
    });
    this.filterItemData.serviceLine.forEach(element => {
      serviceLines.push({
        unitPrice: element.unitPrice,
        lineNo: element.lineNo
      });
    });
    const data: any = {
      generalTenderDocument: {
        tenderNo: localStorage.getItem('tenderNo'),
        revisionNo: this.tenderData.revisionNo,
        bidDisplay: {
          supplyLine: supplyLines,
          serviceLine: serviceLines
        },
      },
      tenderDraftTime: localStorage.getItem('tenderDraftTime') || new Date()
    };
    this.tenderService.tenderSubmit(data).subscribe(res => {
      if (type === 'saveAsDraft') {
        this.router.navigateByUrl('e-tendering/tender-dashboard/current-tenders');
      } else {
        this.proceed();
      }
    });
  }

  public clear(step: string): void {
    switch (step) {
      case this.tenderStep.SUPPLY_LINE:
        this.filterItemData.supplyLine.map(item => {
          item.unitPrice = '';
        });
        break;
      case this.tenderStep.SERVICE_LINE:
        this.filterItemData.serviceLine.map(item => {
          item.unitPrice = '';
        });
        break;
      case this.tenderStep.CONTRACT_BOQS:
        break;
      case this.tenderStep.OTHER_INFO:
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    // console.log('call')
    this.subscription.unsubscribe();
  }
}
