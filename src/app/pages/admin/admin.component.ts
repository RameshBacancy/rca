import { LanguageService } from './../../services/language.service';
import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-menu.service';
import { Router } from '@angular/router';
import { title } from 'process';
import { TranslateStore, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {

  menus: any;
  viewSideBar: boolean = false;
  currentUrl: any = this.router.url;
  url: any = this.currentUrl.split('/');
  public title: any = this.url[this.url.length - 1];

  constructor(
    private sidebarData: SidebarService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private languageService: LanguageService,
    private translateService: TranslateService) {
    router.events.subscribe(e => {
      this.currentUrl = this.router.url;
      this.url = this.currentUrl.split('/');

      this.title = this.url[this.url.length - 1];
      this.setTitle(this.title);
    });
    this.menus = this.sidebarData.getadmindata();
    const language = this.languageService.getLanguage();
    this.translateService.use(language);
  }

  ngOnInit(): void {
    this.setTitle(this.title);
  }


  private setTitle(titleName: string): void {
    switch (titleName) {
      case 'cms':
        this.title = 'CMS';
        break;
      case 'dashboard':
        this.title = 'Admin Panel';
        break;
      case 'suppler-register-request-info':
        this.title = 'Supplier';
        break;
      case 'alert-messages':
        this.title = 'Alert Messages';
        break;
      default:
        this.title = 'Admin Panel';
        break;
    }
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }
}
