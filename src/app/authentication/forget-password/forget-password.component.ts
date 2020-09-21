import { Component, OnInit } from '@angular/core';
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
    private spinner: SpinnerService
  ) { 
    
  }

  
  ngOnInit() {
    this._Activatedroute.queryParams.subscribe((params) => {
      this.user.token =params['token'];
    });
  }


  resetPassword(){
    this.spinner.openSpinner();
    if(this.user.password.toString() == this.confirm_password){  
      this._userService.resetPassword(this.user).subscribe(d => {
        if(d.status === 200){
          this.spinner.closeSpinner();
          this._alertService.pushSuccess(d.message);
          this.router.navigateByUrl('/admin/user/login');
        }
        else{
          this.errorMsg = d.message;
        }
      })
    } else {
      this.spinner.closeSpinner();
      this.errorMsg = 'password mismatch'
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user/login')
  }

}
