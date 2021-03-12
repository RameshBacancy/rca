import { LanguageService } from './../../../services/language.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {

  @Input() showsidebar: boolean;
  @Input() menuData;
  @Input() isAdmin = false;
  @Output() onViewSidebar: EventEmitter<any> = new EventEmitter();
  public viewSideBar: boolean = false;
  public headerMenu: boolean = false;
  public openMessageWindow: boolean = false;
  public showUnreadMessage: boolean = true;
  public sidebarItems;
  showtabs: boolean = true;
  public languageArray = ['English', 'Arabic'];
  selectedLanguage = 'English';
  arStatus: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private spinner: SpinnerService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalService: NgbModal
  ) {
    this.translate.use('English');
  }

  ngOnInit() {
    if (localStorage.getItem('supplierLogin') === 'true') {
      this.showtabs = false;
    }
    this.selectedLanguage = this.languageService.getLanguage() || 'English';
    this.changeLang(this.selectedLanguage);
    // this.translate.use(this.selectedLanguage);
    // this.languageService.setLanguage(this.selectedLanguage);
    this.arStatus = localStorage.getItem('arStatus');
  }


  changeLang(lang) {
    this.languageService.setLanguage(lang);
    this.translate.use(lang);
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


  onViewSideBar() {
    this.viewSideBar = !this.viewSideBar;
    this.onViewSidebar.emit(this.viewSideBar);
  }

  onLogOut() {
    if (localStorage.getItem('supplierLogin') === 'false') {
      this.spinner.openSpinner();
      this.userService.logout();
      this.spinner.closeSpinner();
      localStorage.clear();
      this.router.navigate(['/admin/user/login']);
      this.modalService.dismissAll();
    } else {
      localStorage.clear();
      this.router.navigate(['']);
      this.modalService.dismissAll();
    }
  }

  onChangePassword() {
    this.router.navigate(['/admin/changepassword']);
  }

  onHomePageClick(): void {
    !this.isAdmin ? this.router.navigateByUrl('/landing/supplier-registration/dashboard') : this.router.navigateByUrl('/admin/dashboard');
  }
}
