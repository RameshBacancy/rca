import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public user = {email:'',token:'', newPassword: '', confirmPassword: ''}
  errorMsg: string = '';

  constructor(
    private _userService: UserService,
    private _alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
  }


  resetPassword(){
    if(this.user.newPassword === this.user.confirmPassword){
      this._userService.resetPassword(this.user.email, this.user.token, this.user.newPassword).subscribe(d => {
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
