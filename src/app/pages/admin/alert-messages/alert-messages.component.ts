import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from '../../../shared/pipe/safeHtml.pipe';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { CmsService } from 'src/app/services/cms.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss']
})
export class AlertMessagesComponent implements OnInit {


  @ViewChild('mymodal', {static: false}) mymodal: ElementRef;
  data;
  isdata: boolean = false;
  closeResult: string;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    sanitize: true,
    toolbarHiddenButtons: [
      ['removeFormat'],
      ['textColor'],
      ['backgroundColor'],
      ['customClasses'],
      // ['fontName']
    ],
    customClasses: []
  };
  isnewData: boolean;
  description: any;
  title: string;
  status: string;
  id: any;
  pageMenu: boolean;
  heading: string;
  errorMsg: string;

  constructor(
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private alertMessageService: AlertMessageService,
    private spinner: SpinnerService,
    private safeHtml: SafeHtmlPipe
    ) { }

  ngOnInit(): void {
    this.isnewData = false;
    this.pageMenu = false;
    // this.pagesOptions = ["How to Register", "About Us"];
    this.getMessageData();
  }

  getMessageData() {
    this.alertMessageService.getMessages().subscribe(
      d => {
      this.data = d.data.data;
      if (this.data) {
        this.isdata = true;
      }
      this.ref.detectChanges();
    }, () => {
      this.isdata = true;
      this.ref.detectChanges();
    });
  }

  save() {
    if (this.title !== '' && this.description !== '' && this.status !== '') {
      this.spinner.openSpinner();
      if (!this.isnewData)  {
          this.alertMessageService.addMessages(this.status, this.title, this.description).subscribe(d => {
            this.spinner.closeSpinner();
        });
      } else {
        this.alertMessageService.updateMessages(this.status, this.title, this.description, this.id).subscribe(d => {
          this.spinner.closeSpinner();
        });
      }
      this.getMessageData();
      this.title = '',
      this.description = '';
    } else {
      if (this.status !== '') {
        this.open(this.mymodal);
        this.errorMsg = 'Status can not be empty.';
      } else if (this.title === '') {
        this.open(this.mymodal);
        this.errorMsg = 'Title can not be empty.';
      } else if (this.description === '') {
        this.open(this.mymodal);
        this.errorMsg = 'Description can not be empty.';
      }
    }
  }

  cancel() {
    this.status = '';
    this.title = '',
    this.description = '';
  }

  delete(id, name) {
    if (confirm('Do you want to delete page ' + name + '.')) {
      this.spinner.openSpinner();
      this.alertMessageService.deleteMessages(id).subscribe(d => {
        this.spinner.closeSpinner();
      });
    }
  }

  open(content, data?) {
    if (data) {
      this.heading = 'Edit Alert';
      this.isnewData = true;
      this.id = data.id;
      this.status = data.status;
      this.title = data.title;
      this.description = this.safeHtml.transform(data.description, true);
    } else {
      this.heading = 'Add Alert';
      this.isnewData = false;
      this.id = '';
      this.status = '';
      this.title = '';
      this.description = '';
    }
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
}
