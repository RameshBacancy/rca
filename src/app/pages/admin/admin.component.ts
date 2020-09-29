import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-menu.service';
import { Router } from '@angular/router';
import { title } from 'process';

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

  constructor(private sidebarData: SidebarService, private router: Router, private ref: ChangeDetectorRef) {
    router.events.subscribe(e => {
      this.currentUrl = this.router.url;
      this.url = this.currentUrl.split('/');
      this.title = this.url[this.url.length - 1];
      if (this.title === 'cms') {
        this.title = 'CMS'
      }
      else if (this.title === 'dashboard') {
        this.title = 'Admin Panel'
      }
      else if (this.title === 'request') {
        this.title = 'Registration Requests'
      }
      ref.detectChanges();
    });
    this.menus = this.sidebarData.getadmindata();
  }

  ngOnInit(): void {

  }


  onViewSidebar(val) {
    this.viewSideBar = val;
  }
}
