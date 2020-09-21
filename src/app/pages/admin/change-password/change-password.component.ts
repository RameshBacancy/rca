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
  validForm: boolean;

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
    this._userService.changePassword(this.user.password, this.user.newPassword, this.user.confirmPassword).subscribe(
   
      (response) => {     
          this._alertService.pushSuccess(response.data.message);                      
          this._userService.setToken(response.data.token);
          this.router.navigateByUrl('/admin/dashboard');
          this.spinner.closeSpinner();
      },
      (error) => {                              
        this.errorMsg = error.error.message;
        this.spinner.closeSpinner();
      }
    //   d => {
    //   if(d.status === 200){
    //     this._alertService.pushSuccess(d.message);
    //     this.spinner.closeSpinner();
    //     this.router.navigateByUrl('/admin/dashboard');
    //   }
    //   else{
    //     this.errorMsg = d.message;
    //   }
    // }
    )
  }

  validateEmail(email, psw, newpsw, conpsw) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = true;
        this.errorMsg = "please enter valid email";
    } else if( psw === ''){
      this.validForm = true;
      this.errorMsg = "please enter valid password";
    } else if(newpsw !== conpsw){
      this.validForm = true;
      this.errorMsg = "new password and confirm password not same";
    }
    else {
      this.errorMsg = "";
      this.validForm = false;
    }
  }
  
  cancel(){
    this.router.navigateByUrl('/admin/dashboard');
    this.spinner.closeSpinner();
  }

}
