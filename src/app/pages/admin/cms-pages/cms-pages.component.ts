import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';

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
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['removeFormat'],
      ['textColor'],
      ['backgroundColor'],
      ['customClasses']
    ],
    customClasses: []
  };
  pagesOptions: string[];
  isnewData: boolean;
  description: string;
  title: string;
  selectedPage: string;
  id: any;
  pageMenu: boolean;
  heading: string;
  errorMsg: string;

  constructor(
    private ref: ChangeDetectorRef, 
    private modalService: NgbModal, 
    private _cmsService: CmsService, 
    private _alertService: AlertService,
    private spinner: SpinnerService 
    ) { }

  ngOnInit(): void {
    this.getCMSData();
    this.isnewData = false;
    this.pageMenu = false;
    this.pagesOptions = ["How to Register", "About Us"];
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
    if(this.title !=="" && this.description !== ""&& this.selectedPage !== "Page" && this.selectedPage !== ""){
      if(!this.isnewData)  {
          this._cmsService.addCMS(this.selectedPage, this.title, this.description).subscribe(d => {
            this.getCMSData();
        })
      } else {
        this._cmsService.updateCMS(this.selectedPage, this.title, this.description, this.id).subscribe(d => {
          this.getCMSData();
        })
      }
      this.title = '',
      this.description = '';
    } else {
      if(this.selectedPage !== "Page" && this.selectedPage !== ""){
        this.open(this.mymodal);
        this.errorMsg ="Page must be selected.";
      }
      else if(this.title === ""){ 
        this.open(this.mymodal);
        this.errorMsg ="Title can not be empty.";
      }
      else if(this.description === ""){ 
        this.open(this.mymodal);
        this.errorMsg ="Title can not be empty.";
      }
    }
  }

  cancel() {
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
      this.selectedPage = data.page;
      this.title = data.title;
      this.description = data.description;
    }
    else {
      this.heading = "Add CMS"
      this.isnewData = false;
      this.id = ''
      this.selectedPage = "Page";
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
