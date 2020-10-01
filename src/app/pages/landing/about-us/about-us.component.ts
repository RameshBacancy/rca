import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeHtmlPipe } from 'src/app/pipe/safeHtml.pipe';
import { CmsService } from '../../../services/cms.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  data;
  isdata: boolean = false;
  constructor(private _cmsService: CmsService,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._cmsService.getCMS().subscribe(d => {
      this.data = d.data.data.filter((data: { page: string | string[]; }) => data.page.includes('About Us'));
      this.ref.detectChanges();
    });
  }
}
