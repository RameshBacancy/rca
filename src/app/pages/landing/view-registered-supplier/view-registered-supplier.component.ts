import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-registered-supplier',
  templateUrl: './view-registered-supplier.component.html',
  styleUrls: ['./view-registered-supplier.component.scss']
})
export class ViewRegisteredSupplierComponent implements OnInit {
  supplierType: string;
  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {
    const language = this.languageService.getLanguage();
    this.translateService.use(language);
  }

  ngOnInit(): void {
    this.supplierType = localStorage.getItem('regType');
  }

}
