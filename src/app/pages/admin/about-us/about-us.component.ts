import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service'
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  title: string;
  newData: boolean;
  editor = ClassicEditor;
  data: any = "";
  description = "";

  constructor(
    private _cmsService: CmsService,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this._cmsService.getCMS('about-us').subscribe(d => {
      if(d.data.title || d.data.description){
        this.newData = false;
      } else{
        this.newData = true;
      }
      if(d.data.title){
        this.title = d.data.title
      }
      if(d.data.description){
        this.description = d.data.description
      }
    })
  }

  save(){
    if(this.newData){
      this._cmsService.addCMS('about-us', this.title, this.description).subscribe(d => {
        if(d.status === 200){
          this._alertService.pushSuccess('About Us page created successfully.')
        } else {
          this._alertService.pushError('Page is not added');
        }
      })
    } else{
      this._cmsService.updateCMS('about-us', this.title, this.description).subscribe(d => {
        if(d.status === 200){
          this._alertService.pushSuccess('About Us page updated successfully.')
        } else {
          this._alertService.pushError('Page is not added');
        }
      })
    }
  }
  cancel(){
    this.title = '',
    this.description = '';
  }
}
