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
 
  public user = {email:'',password:'', newPassword: '', confirmPassword: ''}
  errorMsg: string = '';

  constructor(
    private _userService: UserService,
    private _alertService: AlertService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.closeSpinner();
  }

  changePassword(){
    this._userService.changePassword(this.user.password, this.user.newPassword, this.user.confirmPassword).subscribe(d => {
      if(d.status === 200){
        this._alertService.pushSuccess(d.message);
        this.spinner.closeSpinner();
        this.router.navigateByUrl('/admin/dashboard');
      }
      else{
        this.errorMsg = d.message;
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('/admin/dashboard')
  }

}
