import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralTenderDetails } from 'src/app/models/tender.model';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-general-tender-detail',
  templateUrl: './general-tender-detail.component.html',
  styleUrls: ['./general-tender-detail.component.scss']
})
export class GeneralTenderDetailComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  generalTenderDetail: GeneralTenderDetails;
  searchText: string;
  selectedPage: any;
  filesList: any[];
  tenderDocuments: any[];
  closeResult: string;
  files: any[];

  constructor(
    private tenderService: TenderService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.tenderService.getGeneralTenderDetails().subscribe( data => {
      this.generalTenderDetail = data;
    });
    this.tenderDocuments = [];
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

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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
      return  `with: ${reason}`;
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

}
