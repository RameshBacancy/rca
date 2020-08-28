import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  @Output() onViewSidebar: EventEmitter<any> = new EventEmitter();
  public viewSideBar: boolean = false;
  public headerMenu: boolean = false;
  public openMessageWindow: boolean = false;
  public showUnreadMessage: boolean = true;
  
  constructor(private router: Router,) { }

  ngOnInit() {
  }
  /**
   * Navigates to Dashboard
   */
  public toDashboard() {
  }
  /**
 * For open header menu
 */
  public openMenu() {
    this.headerMenu = !this.headerMenu;
  }

  /**
   * For handling click outside event for menu
   */
  public handleClickOutside() {
    this.headerMenu = false;
  }

  public openMessageModal() {
    this.openMessageWindow = !this.openMessageWindow;
  }


  onViewSideBar(){
    this.viewSideBar = !this.viewSideBar;
    this.onViewSidebar.emit(this.viewSideBar);
  }

  // onLogOut(){
  //   this.router.navigate(['/auth/login']);
  //   this._userService.logout();
  // }
}
