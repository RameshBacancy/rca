import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-how-to-register',
  templateUrl: './how-to-register.component.html',
  styleUrls: ['./how-to-register.component.scss']
})
export class HowToRegisterComponent implements OnInit {
  data;
  isdata: boolean = false;
  constructor(private _cmsService: CmsService,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._cmsService.getCMS().subscribe(d => {
      this.data = d.data.data.filter((data: { page: string | string[]; }) => data.page.includes('How to Register'));
      this.ref.detectChanges();
    });
  }
}
