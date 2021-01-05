import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar-menu.service';

export interface Option {
  id: number;
  name: string;
  checked?: boolean;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit, AfterViewInit {
  viewSideBar: boolean = false;
  public title: string;
  public currentUrl: string;
  url: string[];
  menu: any[] = [];
  filteredMenu: any[] = [];
  paymentStatus: string;

  constructor(
    private router: Router,
    private sidebarData: SidebarService,
    private ref: ChangeDetectorRef,
    private userService: UserService
  ) {
    router.events.subscribe(e => {
      this.currentUrl = this.router.url;
      this.url = this.currentUrl.split('/');
      this.title = this.url[this.url.length - 1];
      if (this.title === 'dashboard') {
        this.title = 'Supplier Portal';
      } else if (this.title === 'registration') {
        this.title = 'Registration';
      } else if (this.title === 'about-us') {
        this.title = 'About Us';
      } else if (this.title === 'how-to-register') {
        this.title = 'How To Register';
      } else if (this.title === 'login') {
        this.title = 'Login';
      }
      ref.detectChanges();
    });
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.url = this.currentUrl.split('/');
    this.title = this.url[this.url.length - 1];
    if (this.title === 'dashboard') {
      this.title = 'Supplier Portal';
    }
    if (this.title === 'registration') {
      this.title = 'Registration';
    }
    this.menu = this.sidebarData.getdata();
    this.paymentStatus = localStorage.getItem('completePayment');
    this.userService.paymentObs.subscribe(res => {
      this.paymentStatus = String(res);
      this.paymentStatus = localStorage.getItem('completePayment');
      this.filterMenu();
    });
  }

  ngAfterViewInit() {
    this.filterMenu();
  }

  private filterMenu(): void {
    if (this.paymentStatus !== 'true') {
      this.filteredMenu = this.menu.filter(m => m.name !== 'SUPPLIER COLLABORATION');
    } else {
      this.filteredMenu = [...this.menu];
    }
  }


  onViewSidebar(val) {
    this.viewSideBar = val;
  }

}
