import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public user = {email:'', newPassword: '', confirmPassword: ''}
  errorMsg: string = '';
  token: any;

  form = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
    confirmpassword: new FormControl('', [])
  })
  
  constructor(
    private _userService: UserService,
    private _alertService: AlertService,
    private router: Router,
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit() {
    // this.token = this._Activatedroute.snapshot.paramMap.get("token");
    console.log(this._Activatedroute.snapshot.paramMap.get("token"));
    // console.log(this.token);
    this._Activatedroute.params.subscribe((params) => {
     console.log(params)
  });
  }


  resetPassword(){
    console.log(this._Activatedroute.snapshot.paramMap.get("token"));
    console.log(this.form.value)
    // this.token = this._Activatedroute.snapshot.paramMap.get("token");
    // if(this.user.newPassword === this.user.confirmPassword){
    // this.token = this._Activatedroute.snapshot.paramMap.get("token");
    //   this._userService.resetPassword(this.user.email, this.token, this.user.newPassword).subscribe(d => {
    //     if(d.status === 200){
    //       this._alertService.pushSuccess(d.message);
    //       this.router.navigateByUrl('/admin/user/login');
    //     }
    //     else{
    //       this.errorMsg = d.message;
    //     }
    //   })
    // } else {
    //   this.errorMsg = 'password mismatch'
    // }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user/login')
  }

 

}
