import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  user = { email: '', password: '', token: '' };
  mail: string;
  password: string;
  token: string;
  confirm_password: string;
  errorMsg: any;

  constructor(
    private _userService: UserService,
    private _alertService: AlertService,
    private router: Router,
    private _Activatedroute:ActivatedRoute,
    private spinner: SpinnerService,
    private location : Location
  ) { 
    
  }

  
  ngOnInit() {
    this._Activatedroute.queryParams.subscribe((params) => {
      this.user.token =params['token'];
    });
    let alteredURL = this.removeParam("token", this.router.url);
    this.location.replaceState('forgetpassword')
    
  }


  resetPassword(){
    this.spinner.openSpinner();
    if(this.user.password.toString() == this.confirm_password){  
      this._userService.resetPassword(this.user).subscribe(
        (response) => {                           
          this._userService.setToken(response.data.token);
            this._alertService.pushSuccess(response.data.message);
              this.router.navigateByUrl('/admin/user/login');
            this.spinner.closeSpinner();
        },
        (error) => {                              //Error callback
          // console.error('error caught in component')
          this.errorMsg = error.error.message;
          this.spinner.closeSpinner();
        }
      //   d => {
      //   if(d.status === 200){
      //     this.spinner.closeSpinner();
      //     this._alertService.pushSuccess(d.message);
      //     this.router.navigateByUrl('/admin/user/login');
      //   }
      //   else{
      //     this.errorMsg = d.message;
      //   }
      // }
      )
    } else {
      this.spinner.closeSpinner();
      this.errorMsg = 'password mismatch'
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user/login')
  }

  removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
}
