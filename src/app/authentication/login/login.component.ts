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


  public user = {email:"",password:""}

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login()
  {
    this._userService.login(this.user.email,this.user.password);
  }

}
