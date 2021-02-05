import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-menu.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  viewSideBar: boolean = false;
  menu;

  constructor(
    private sidebarData: SidebarService
  ) {
  }

  ngOnInit(): void {
    this.menu = this.sidebarData.getdata();
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }

}
