import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CmsService } from 'src/app/services/cms.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-how-to-register',
  templateUrl: './how-to-register.component.html',
  styleUrls: ['./how-to-register.component.scss']
})
export class HowToRegisterComponent implements OnInit {

  id: number;
  title: string;
  newData: boolean = true;
  description = "";
  allData: any[] = [] ;

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
      ['removeFormat']
    ],
    customClasses: []
  };
  
  constructor(
    private router: Router,
    private _cmsService: CmsService,
    private _alertService: AlertService,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getCMSData();
    this.spinner.closeSpinner();
  }

  openData(id) {
    let d = this.allData.find(d => d.id == id);
    this.newData = false;
    if(d){
      this.id = d.id;
      if (d.title) {
        this.title = d.title
      }
      if (d.description) {
        this.description = d.description;
      }
    }
  }

  getCMSData(){
    this._cmsService.getCMS().subscribe(d => {
      if (d.data.data) {
        d.data.data.filter(d => {
          if (d.page == 'how-to-register') {
            if (d.title || d.description) {
              this.allData.push(d);
              this.ref.detectChanges();
            }
          }
        });
      }
    });
  }
  save() {
    if (this.newData) {
      this._cmsService.addCMS('how-to-register', this.title, this.description).subscribe(d => {
        if (d.status === 200) {
          this._alertService.pushSuccess('Page created successfully.');
          this.spinner.closeSpinner();
        }
      })
    } else {
      this._cmsService.updateCMS('how-to-register', this.title, this.description, this.id).subscribe(d => {
        if (d.status === 200) {
          this._alertService.pushSuccess('Page updated successfully.');
          this.spinner.closeSpinner();
        } 
      })
    }   
    this.title = '',
    this.description = '';
  }
  cancel() {
    this.title = '',
    this.description = '';
  }

  deleteCMS(id, name){
    if(confirm('Do you want to delete page '+ name+ '.')){
      this._cmsService.deleteCMS(id).subscribe(d => {
        this.spinner.closeSpinner();
       })
    }
  }
}
