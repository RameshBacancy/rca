import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { AlertService } from 'src/app/services/alert.service';
import { CmsService } from 'src/app/services/cms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-to-register',
  templateUrl: './how-to-register.component.html',
  styleUrls: ['./how-to-register.component.scss']
})
export class HowToRegisterComponent implements OnInit {

  id: number;
  title: string;
  newData: boolean = true;;
  editor = ClassicEditor;
  data: any = "";
  description = "";
  allData: any[] = [] ;

  constructor(
    private router: Router,
    private _cmsService: CmsService,
    private _alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCMSData();
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
        }
      })
    } else {
      this._cmsService.updateCMS('how-to-register', this.title, this.description, this.id).subscribe(d => {
        if (d.status === 200) {
          this._alertService.pushSuccess('Page updated successfully.')
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

  deleteCMS(id){
    this._cmsService.deleteCMS(id).subscribe(d => { })
  }
}
