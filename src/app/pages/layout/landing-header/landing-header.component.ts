import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  @Output() onViewSidebar: EventEmitter<any> = new EventEmitter();
  @Input() showsidebar: boolean;
  @Input() menuData;
  public viewSideBar: boolean = false;
  public headerMenu: boolean = false;
  public openMessageWindow: boolean = false;
  public showUnreadMessage: boolean = true;
  public sidebarItems;
  showtabs: boolean =true;
  
  constructor(private router: Router, private _userService :UserService, private spinner: SpinnerService) { }

  ngOnInit() {
    if(localStorage.getItem('supplierLogin') === 'true'){
      this.showtabs = false;
    }
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

  onLogOut(){
    if(localStorage.getItem('supplierLogin') === 'true'){
      localStorage.clear();
      this.router.navigate(['']);
    } else {
      this.spinner.openSpinner();
      this._userService.logout();
      this.spinner.closeSpinner();
      localStorage.clear();
      this.router.navigate(['/admin/user/login']);
    }
  }

  onChangePassword(){
    this.router.navigate(['/admin/changepassword']);
  }

  
}
