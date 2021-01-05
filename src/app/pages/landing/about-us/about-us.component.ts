import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeHtmlPipe } from '../../../shared/pipe/safeHtml.pipe';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CmsService } from '../../../services/cms.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  data;
  isdata: boolean = false;
  constructor(private cmsService: CmsService, private ref: ChangeDetectorRef, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.openSpinner();
    this.getData();
    this.spinner.closeSpinner();
  }

  getData() {
    this.cmsService.getCMS().subscribe(d => {
      this.data = d.data.data.filter((data: { page: string | string[]; }) => data.page.includes('About Us'));
      this.ref.detectChanges();
    });
  }
}
