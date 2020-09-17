import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public user = {email:'', password: '', confirmpassword: ''}
  errorMsg: string = '';
  token: any;
  form: FormGroup;
  name = "r";

  myForm: FormGroup;


  constructor(
    public fb: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private router: Router,
    private _Activatedroute:ActivatedRoute
  ) { 
    
  }

  
  ngOnInit() {
    // this.form = this.fb.group({
    //   email: new FormControl(''),
    //   password: new FormControl(''),
    //   confirmpassword: new FormControl(''),
    //   token:new FormControl('')
    // });

    this.myForm = this.fb.group({
      name: ['Benedict', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
      message: ['', [Validators.required, Validators.minLength(15)]]
    });
    
    this.form = new FormGroup({
      // name: new FormControl('Benedict'),
      email: new FormControl(''),
      // message: new FormControl('')
    });
    // this._Activatedroute.queryParams.subscribe((params) => {
    //   this.form.controls['token'].setValue(params['token']);
    // });
  }


  resetPassword(){
    console.log(this.form);
    this.form.get('email').valueChanges.subscribe(  
      value=> {  
         console.log(value);  
      }  
   ); 
    if(this.form.value.newPassword === this.form.value.confirmPassword){
      console.log(this.form.value)
      console.log(this.user)
      // this._userService.resetPassword(this.form.value).subscribe(d => {
      //   if(d.status === 200){
      //     this._alertService.pushSuccess(d.message);
      //     this.router.navigateByUrl('/admin/user/login');
      //   }
      //   else{
      //     this.errorMsg = d.message;
      //   }
      // })
    } else {
      this.errorMsg = 'password mismatch'
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user/login')
  }

  onSubmit(f){
        console.log(f.value)
  }

 

}
