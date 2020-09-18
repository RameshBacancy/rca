import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private _Activatedroute:ActivatedRoute
  ) { 
    
  }

  
  ngOnInit() {
    this._Activatedroute.queryParams.subscribe((params) => {
      this.user.token =params['token'];
    });
  }


  resetPassword(){
    if(this.user.password.toString() == this.confirm_password){
      console.log(this.user);
      this._userService.resetPassword(this.user).subscribe(d => {
        if(d.status === 200){
          this._alertService.pushSuccess(d.message);
          this.router.navigateByUrl('/admin/user/login');
        }
        else{
          this.errorMsg = d.message;
        }
      })
    } else {
      this.errorMsg = 'password mismatch'
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user/login')
  }

}
