import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menus: any;
  viewSideBar:boolean = false;
  currentUrl: any;
  url: any;

  constructor(private sidebarData: SidebarService, private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.url = this.currentUrl.split('/');
    
    this.menus = this.sidebarData.getdata();
  }


  onViewSidebar(val){
    this.viewSideBar = val;
  }
}
