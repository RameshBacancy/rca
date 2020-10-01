import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertService } from '../../../services/alert.service';
import { SpinnerService } from '../../../services/spinner.service';
import { SafeHtmlPipe } from 'src/app/pipe/safeHtml.pipe';



@Component({
  selector: 'app-cms-pages',
  templateUrl: './cms-pages.component.html',
  styleUrls: ['./cms-pages.component.scss']
})
export class CmsPagesComponent implements OnInit {

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
  pagesOptions: string[];
  isnewData: boolean;
  description: any;
  title: string;
  page: string;
  id: any;
  pageMenu: boolean;
  heading: string;
  errorMsg: string;

  constructor(
    private ref: ChangeDetectorRef, 
    private modalService: NgbModal, 
    private _cmsService: CmsService, 
    private _alertService: AlertService,
    private spinner: SpinnerService,
    private safeHtml: SafeHtmlPipe 
    ) { }

  ngOnInit(): void {
    this.getCMSData();
    this.isnewData = false;
    this.pageMenu = false;
    // this.pagesOptions = ["How to Register", "About Us"];
  }

  getCMSData(){
    this._cmsService.getCMS().subscribe(d => {
      this.data = d.data.data;
      if(this.data){
        if(this.data.length > 0){
          this.isdata = true;
        }
      }
      this.ref.detectChanges();
    });
  }

  save() {
    if(this.title !=="" && this.description !== "" && this.page !== ""){
      if(!this.isnewData)  {
          this._cmsService.addCMS(this.page, this.title, this.description).subscribe(d => {
            this.getCMSData();
        })
      } else {
        this._cmsService.updateCMS(this.page, this.title, this.description, this.id).subscribe(d => {
          this.getCMSData();
        })
      }
      this.title = '',
      this.description = '';
    } else {
      if(this.page !== ""){
        this.open(this.mymodal);
        this.errorMsg ="Page name can not be empty.";
      }
      else if(this.title === ""){ 
        this.open(this.mymodal);
        this.errorMsg ="Title can not be empty.";
      }
      else if(this.description === ""){ 
        this.open(this.mymodal);
        this.errorMsg ="Description can not be empty.";
      }
    }
  }

  cancel() {
    this.page = '';
    this.title = '',
    this.description = '';
  }

  delete(id, name){
    if(confirm('Do you want to delete page '+ name+ '.')){
      this._cmsService.deleteCMS(id).subscribe(d => { });
      this.getCMSData();
    }
  }

  open(content, data?) {
    if(data){
      this.heading = "Edit CMS"
      this.isnewData = true;
      this.id = data.id
      this.page = data.page;
      this.title = data.title;
      this.description = this.safeHtml.transform(data.description, true);
    }
    else {
      this.heading = "Add CMS"
      this.isnewData = false;
      this.id = ''
      this.page = '';
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
