import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public user = {email: '', password: '', newPassword: '', confirmPassword: ''};
  errorMsg = '';
  validForm = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.closeSpinner();
  }

  changePassword() {
  if (this.validForm) {
    this.spinner.openSpinner();
    this.userService.changePassword(this.user.password, this.user.newPassword, this.user.confirmPassword);
    }
  }

  validateEmail(email?, psw?, newpsw?, conpsw?) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = false;
      this.errorMsg = 'Please enter valid email.';
    } else if ( psw === '') {
      this.validForm = false;
      this.errorMsg = 'Please enter valid password.';
    } else if (newpsw !== conpsw) {
      this.validForm = false;
      this.errorMsg = 'New password and confirm password not same.';
    } else {
      this.errorMsg = '';
      this.validForm = true;
    }
  }

  cancel() {
    this.router.navigateByUrl('/admin/dashboard');
    this.spinner.closeSpinner();
  }

}
