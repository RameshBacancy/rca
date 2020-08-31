import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // public login = new FormGroup({
  //   email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  //   password: new FormControl('cityslicka', [Validators.required]),
  // });

  // constructor(
  //   private _userService: UserService,
  //   private router: Router
  // ) { }

  ngOnInit() {
  }

  // onLoginSubmit(): void {
  //   if (this.login.valid) {
  //     const user = {
  //       email: this.login.controls['email'].value,
  //       password: this.login.controls['password'].value
  //     };
  //     console.log('user :: ', user);
  //     this._userService.login(user)
  //       .subscribe(res => {
  //         if (res.token) {
  //           this._userService.storeUserToken(res.token);
  //           this.router.navigate(['/landing']);
  //         }
  //       },
  //         error => {
  //           console.log('error : ', error);
  //           debugger;
  //         },
  //       );
  //   }
  // }
}
