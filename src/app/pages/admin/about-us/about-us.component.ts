import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

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
          if (d.page == 'about-us') {
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
      this._cmsService.addCMS('about-us', this.title, this.description).subscribe(d => {
        if (d.status === 200) {
          this._alertService.pushSuccess('Page created successfully.');
          this.ref.detectChanges();
        } else {
          this._alertService.pushError('Page is not added');
        }
      })
    } else {
      this._cmsService.updateCMS('about-us', this.title, this.description, this.id).subscribe(d => {
        if (d.status === 200) {
          this._alertService.pushSuccess('Page updated successfully.')
        } else {
          this._alertService.pushError('Page is not added');
        }
      })
    }
        this.ref.detectChanges();
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
